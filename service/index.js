const Koa = require('koa')
const Static = require('koa-static')
const KoaBody = require('koa-body')
const apiRouter = require('./router')

const app = new Koa()

app.use(KoaBody())
app.use(Static(__dirname + '/static'))

app.use(apiRouter.routes())
app.listen(3801)
