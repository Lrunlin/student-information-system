const express = require('express')
const router = express.Router();
const db = require('@/db');
const admin = require('@/utils/admin');

router.delete("/target/:id", admin, async (req, res, next) => {
    let id = req.params.id;
    let sql = `DELETE FROM notice WHERE id='${id}';`

    let [row] = await db.query(sql);
    let isSuccess = !!row.affectedRows;

    res.json({
        success: isSuccess,
        message: isSuccess ? '删除成功' : '删除失败',
    });
});
module.exports = router;