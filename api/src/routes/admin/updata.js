const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer')
const db = require('@/db');
const admin = require('@/utils/admin');

router.put("/admin", admin, async (req, res, next) => {
    let [rows] = await db.query(`UPDATE admin SET password='${req.body.password}' WHERE id='${req.id}';`);
    let isSuccess = !!rows.affectedRows;
    res.json({
        success: isSuccess,
        message: isSuccess ? '修改成功' : '修改失败'
    })
});
module.exports = router;
