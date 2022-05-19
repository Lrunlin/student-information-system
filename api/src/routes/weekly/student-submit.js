const express = require('express');
const router = express.Router();
const db = require('@/db');
const auth = require('@/utils/auth');
const {
    v4
} = require('uuid');

router.post('/weekly/student', auth, async (req, res) => {
    let {
        unit,
        content,
        week_time
    } = req.body;
    let [count] = await db.query(`select count(id) from weekly where student_id='${req.id}' and week_time=${week_time};`);
    if (count[0]['count(id)']) {
        res.json({
            success: false,
            message: `已经存在第${week_time}的周报，请在查询页面进行修改`
        })
        return false;
    }
    let sql = `INSERT INTO weekly ( id, student_id,content,unit,week_time,modifiable,time)
                       VALUES
             ('${v4()}','${req.id}','${content}','${unit}',${week_time},true,NOW());`
    try {
        let [row] = await db.query(sql);
        let isSuccess = !!row.affectedRows;
        if (!isSuccess) {
            res.json({
                success: false,
                message: '发布失败'
            });
            return false;
        }
        res.json({
            success: true,
            message: '发布成功'
        })
    } catch (error) {
        res.json({
            success: false,
            message: '发布失败'
        })
    }
});
module.exports = router;