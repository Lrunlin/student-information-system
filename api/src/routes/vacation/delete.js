const express = require('express');
const router = express.Router();
const db = require('@/db');
const auth = require('@/utils/auth');


router.delete('/vacation/:id', auth, async (req, res) => {

    let id = req.params.id;
    //同时判断学生，防止自己的假条被其他人删除
    let sql = `DELETE FROM vacation WHERE id='${id}' and student='${req.id}';`

    let [row] = await db.query(sql);
    let isSuccess = !!row.affectedRows;

    res.json({
        success: isSuccess,
        message: isSuccess ? '更新成功' : '更新失败'
    });

});
module.exports = router;