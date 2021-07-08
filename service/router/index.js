const Router = require('koa-router')
const mysql2 = require('mysql2')
const router = new Router()
const pool = mysql2.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123',
    database: 'birthday'
})
const promisePool = pool.promise();
router.post('/api/login', async ctx => {
    try {
        const {
            username, password
        } = ctx.request.body;

        // 登录之前要检查数据库中是否已经存在了
        const [rows_queryByName] = await promisePool.execute(`SELECT * FROM user WHERE username = ?`, [username]);
        if (rows_queryByName.length === 0) {
            // 说明是新用户，执行插入操作
            const [rows] = await promisePool.execute(`INSERT INTO user(username,password) VALUES (?,?)`, [username, password])
            ctx.body = {
                error: false,
                rows: rows,
            }
        } else {
            // 说明是老用户，验证密码是否正确
            const queryPassword = rows_queryByName[0].password;
            const { id } = rows_queryByName[0];
            if (queryPassword === password) {
                // 设置缓存，防止重新登录
                ctx.cookies.set('birthday_username', username, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    httpOnly: false,
                })
                ctx.cookies.set('birthday_userid', id, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    httpOnly: false,
                })
                ctx.body = {
                    error: false,
                }
            } else {
                ctx.body = {
                    error: true,
                    message: '密码输入错误！'
                }
            }
        }
    } catch (e) {
        console.log(e);
        ctx.status = 400;
        ctx.body = {
            error: 'CANNOT_PARSE'
        };
    }
})

router.get('/api/logout', async ctx => {
    try {
        ctx.cookies.set('birthday_username', '', {
            maxAge: 0,
        })
        ctx.cookies.set('birthday_userid', '', {
            maxAge: 0,
        })
        ctx.body = {
            error: false
        }
    } catch (error) {
        console.log(error);
        ctx.status = 400
        ctx.body = {
            error: 'CANNOT_PARSE'
        }
    }
})
module.exports = router