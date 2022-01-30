const express = require('express');
const db = require('@/db');
const app = express();
const fs = require('fs');
const path = require('path');
const {
    LOADIPHLPAPI
} = require('dns');
const router = express.Router();
router.get('/email', async (req, res) => {
    let template = fs.readFileSync(path.join(__dirname, `../../views/email.html`)).toString()

    let key = req.query.key;
    let data = global.email[key];
    if (!data) {
        template = template.replace('<!-- HTMLtitle -->', '错误')
        template = template.replace('<!-- title -->', '没有找到您的邮箱发送记录')
        template = template.replace('<!-- content -->', `<p>请在学生档案管理系统中登录并发送激活邮件后在收到的邮件中点击激活链接</p><p style="color:red;">重复点击链接会导致链接失效(无论是否成功都只能点击一次)</p>`);
        res.send(template);
        return false;
    };

    let sql = `UPDATE ${data.authentication} SET 
    email = '${data.email}'  WHERE id='${data.id}';`
    let [row] = await db.query(sql)
    let isSuccess = !!row.affectedRows;
    template = template.replace('<!-- HTMLtitle -->', isSuccess ? '成功' : '错误')
    template = template.replace('<!-- title -->', isSuccess ? '邮箱修改成功' : '没有找到您的邮箱发送记录')
    template = template.replace('<!-- content -->', isSuccess ? `将身份:${data.authentication},账号:${data.id}的邮箱修改为:${data.email}` : '请在学生档案管理系统中登录并发送激活邮件后在收到的邮件中点击激活链接');
    res.send(template);

    // 无论是否处理成功都要删除记录
    delete global.email[key];
})
module.exports = router;