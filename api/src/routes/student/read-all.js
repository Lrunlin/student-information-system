const express = require('express');
const app = express();
const router = express.Router();
const db = require('@/db');
const admin = require('@/utils/admin');

router.get('/student', admin,async (req, res) => {
    let sql = `select * from student;`
    let [rows] = await db.query(sql);
    res.json({
        success: !!rows.length,
        message: `查询全部学生`,
        data:rows
    });
})
module.exports = router;