const express = require('express');
const router = express.Router();
const db = require('@/db');
const auth = require('@/utils/auth');
const {
    v4
} = require('uuid');

router.get('/weekly/student', auth, async (req, res) => {
    let sql = `select * from weekly where student_id='${req.id}';`
    let [row] = await db.query(sql);

    res.json({
        success: true,
        message: `查询学生${req.id}的周报`,
        data: row.sort((a, b) => a.week_time - b.week_time)
    });
});
module.exports = router;