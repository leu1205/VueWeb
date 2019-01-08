const Router = require('koa-router');
const employees = require('../models/employees');
const router = new Router({
    prefix: "/employees"
});

router.get('/', async (ctx, next) => {
    ctx.body = await employees.find({});
});

router.get('/:employee_id', async (ctx, next) => {
    let employee_id = ctx.params.employee_id;

    await employees.findOne({employee_id:employee_id})
    .then((doc) => {
        ctx.body = doc;
    })
});

router.post('/', async (ctx, next) => {
    let employee_id = 0;
    await employees.findOne().sort({employee_id:-1}).then(function(doc) {
        if(doc != null){
            employee_id = doc.employee_id;
        }
        ++employee_id;
    });

    let data = {
        employee_id: employee_id,
        name: ctx.request.body.eName,
        gender: ctx.request.body.gender,
        title: ctx.request.body.title,
        content: ctx.request.body.content,
        updated_at: Date.now()
    };
    var employee = new employees(data);
    await employee.save().then( doc => {
        if(doc) {
            ctx.res.statusCode = 200;
        } else {
            ctx.res.statusCode = 400;
        }
    });
});

router.patch('/:employee_id', async (ctx, next) => {
    let employee_id = ctx.params.employee_id;

    let  query = {employee_id:employee_id};
    let doc = {
        name: ctx.request.body.eName,
        gender: ctx.request.body.gender,
        title: ctx.request.body.title,
        content: ctx.request.body.content,
        updated_at: Date.now()
    };

    await employees.updateOne(query, { $set: doc }, (err)=>{
        if(err) {
            ctx.res.statusCode = 400;
        } else {
            ctx.res.statusCode = 200;
        }
    });
});

router.delete('/:employee_id', async (ctx, next) => {
    let employee_id = ctx.params.employee_id;
    let  query = {employee_id:employee_id};

    await employees.deleteOne(query, (err) => {
        if(err) {
            ctx.res.statusCode = 400;
        } else {
            ctx.res.statusCode = 200;
        }
    });
});

module.exports = router;