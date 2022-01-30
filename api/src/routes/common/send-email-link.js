const express = require('express');
const md5 = require('md5');
const app = express();
const router = express.Router();
const auth = require("@/utils/auth");
const email = require('@/utils/email');
//需要先在全局变量上创建email对象
global.email = {}
router.put('/email/:email', auth, async (req, res) => {
    let user_email = req.params.email;
    let key = md5(req.authentication + req.id + Math.random()) + (+new Date());
    let content = `
      <h2>学生档案管理系统账号激活</h2>
      <div>身份:${req.authentication}</div>
      <div>账号:${req.id}</div>
      <h3 style="color:red;">如果不是您在系统中发送的验证链接请不要点击并且忽略这条邮件</h3>
      <a style="font-weight:700;font-size:24px;" href=http://localhost:3000/email?key=${key}>验证链接(有效时间1小时)</a>
    `;
    let result = await email(`激活邮箱`, content, user_email)
    res.json(result);

    //发送成功就保存在内存中
    if (result.success) {
        global.email[key] = {
            id: req.id,
            authentication: req.authentication,
            email: user_email
        }
        setTimeout(() => {
            if (global.email[key]) {
                delete global.email[key];
            }
        }, 3600000);
    }

});
module.exports = router;