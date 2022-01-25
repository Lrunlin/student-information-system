const express = require('express');
const db = require('@/db');
const router = express.Router();

router.get('/teacher/:key/:value', async (req, res) => {
    let {
        key,
        value
    } = req.params;
    let sql = `select * from teacher where ${key}='${value}'`
    let [rows] = await db.query(sql);
    res.json({
        success: !!rows.length,
        message: `查询${key}为${value}的教师`,
        data: rows.map(item => {
            if (item.class) {
                item.class = item.class.split(',')
            }
            return item;
        })
    });
})
module.exports = router;