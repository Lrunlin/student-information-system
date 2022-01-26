const express = require('express');
const db = require('@/db');
const router = express.Router();
const admin = require('@/utils/admin');

router.get('/student/:key/:value',admin, async (req, res) => {
    let {
        key,
        value
    } = req.params;
    let sql = `select * from student where ${key}='${value}'`
    let [rows] = await db.query(sql);
    res.json({
        success: !!rows.length,
        message: `查询${key}为${value}的学生`,
        data: rows
    });
})
module.exports = router;