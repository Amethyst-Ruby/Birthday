
const Router = require('koa-router')
const mysql2 = require('mysql2')
const router = new Router()
router.post('/login', ctx => {
    let {
        name, password
    } = ctx.request.body;
    console.log(name, password);
    console.log(ctx);
    ctx.body = {
        key: '1'
    }
})
module.exports = router