
const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

/* ↓---its added by me---↓ */
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const session = require('koa-session');
const employees = require('./routes/employees');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const router = new Router;
mongoose.connect("mongodb://localhost:27017/koaWeb", {
    useNewUrlParser: true
});
/* ↑---its added by me---↑ */

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.keys = [config.env.cookieSecret];
  app.use(bodyParser()); 
  app.use(session(config.env.session, app));
  router.use(employees.routes(), employees.allowedMethods());
  router.use(auth.routes(), auth.allowedMethods());
  app.use(router.routes());
  app.use( ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    ctx.req.session = ctx.session;
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })
  
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
