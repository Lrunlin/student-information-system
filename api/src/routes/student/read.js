const express = require('express');
const db = require('@/db');
const router = express.Router();
const auth = require('@/utils/auth');

router.get('/student/:key/:value', auth, async (req, res) => {
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