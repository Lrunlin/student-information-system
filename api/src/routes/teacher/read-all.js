const express = require('express');
const app = express();
const router = express.Router();
const db = require('@/db');
const admin = require('@/utils/admin');

router.get('/teacher',admin, async (req, res) => {
    let sql = `select * from teacher;`
    let [rows] = await db.query(sql);
    res.json({
        success: !!rows.length,
        message: `查询全部教师`,
        data: rows.map(item => {
            if (item.class) {
                item.class = item.class.split(',')
            }
            return item;
        })
    });
})
module.exports = router;