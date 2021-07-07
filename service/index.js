const Koa = require('koa')
const Static = require('koa-static')
const KoaBody = require('koa-body')
const apiRouter = require('./router')
const path = require('path')
const fs = require('fs')

const app = new Koa()

app.use(KoaBody())
app.use(Static(path.join(__dirname + '/../front/dist')))

apiRouter.get('/',ctx=>{
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream(__dirname + '/../front/dist/index.html')
})

app.use(apiRouter.routes())
app.listen(9000)
