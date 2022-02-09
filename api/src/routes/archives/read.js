const express = require('express')
const router = express.Router();
const db = require('@/db');
const auth = require('@/utils/auth');

router.get("/archives/:id", auth, async (req, res, next) => {
    let sql = `select * from archives where student='${req.params.id}' ORDER BY time DESC;`

    let [rows] = await db.query(sql);
    for (let i = 0; i < rows.length; i++) {
        let [_teacher] = await db.query(`select * from teacher where id='${rows[i].teacher}';`)
        rows[i].teacher = _teacher[0];
    };

    res.json({
        success: true,
        message: `查询学生 ${req.params.id} 的档案`,
        data: rows
    });
});
module.exports = router;