const express = require('express')
const router = express.Router();
const db = require('@/db');
const auth = require('@/utils/auth');

router.get("/target", auth, async (req, res, next) => {
    let sql = req.authentication == 'admin' ? 'select * from notice;' : `select * from notice where target='${req.authentication}';`
    let [rows] = await db.query(sql);
    res.json({
        success: true,
        message: `查询 ${req.authentication} 接收的邮件`,
        data: rows
    })

});
module.exports = router;