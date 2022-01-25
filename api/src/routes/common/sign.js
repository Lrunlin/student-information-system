const express = require('express');
const db = require('@/db');
const token = require('@/utils/token');
const app = express();
const router = express.Router();

router.post('/sign', async (req, res) => {
    let {
        id,
        password,
        identity
    } = req.body;

    let sql = `select count(id) from ${identity} where id='${id}' and password='${password}';`
    let [row] = await db.query(sql);
    let isSuccess = !!row[0]['count(id)'];
    res.json({
        success: isSuccess,
        message: isSuccess ? '登录成功' : '账号或密码错误',
        data: token(id, identity)
    })
})
module.exports = router;