const express = require('express')
const md5 = require('md5')
const router = express.Router();
const db = require('@/db');
const email = require('@/utils/email');
const admin = require('@/utils/admin');

router.post("/email/:identity", admin, async (req, res, next) => {
    let [rows] = await db.query(`select email from ${req.params.identity};`);
    let result = await email(req.body.title, req.body.content, rows.filter(item => !!item).map(item => item.email).join(','))
    if (result.success) {
        let id = md5(JSON.stringify(req.body));
        let [noticeRow] = await db.query(`INSERT INTO notice ( id, title,content,target,time )
                       VALUES
                       ('${id}', '${req.body.title}', '${req.body.content}', '${req.params.identity}',NOW());
                       `);
    }
    res.json(result)
});
module.exports = router;