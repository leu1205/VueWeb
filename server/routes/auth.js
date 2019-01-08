const Router = require('koa-router');
const users = require('../models/users')
const router = new Router();

router.post('/signup', async (ctx) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let data = {
        username:username,
        password:password
    };
    let query = await users.findOne({username:username});

    if(query){
        ctx.res.statusCode = 400;
    } else {
        var user = new users(data);
        await user.save().then( doc => {
            if(doc) {
                ctx.res.statusCode = 200;
            } else {
                ctx.res.statusCode = 500;
            }
        });
    }
})

router.post('/login', async (ctx) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let data = {
        username:username,
        password:password
    }
    let query = await users.findOne(data);
    if(query){
        ctx.res.statusCode = 200;
        ctx.session.username = username;
    } else {
        ctx.res.statusCode = 400;
    }
})

router.get('/logout', (ctx) => {
    ctx.session.username = null;
    ctx.res.statusCode = 200;
})

module.exports = router;