
const Router = require('koa-router')
const mysql2 = require('mysql2')
const router = new Router()
router.post('/api/login', async ctx => {
    try {
        const {
            name, password
        } = ctx.request.body
        console.log(name.password);
        ctx.body = 1
    } catch {
        ctx.status = 400;
        console.log(e);
        ctx.body = {
            error: 'CANNOT_PARSE'
        };
    }

})
module.exports = router