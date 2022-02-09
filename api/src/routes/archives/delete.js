const express = require('express')
const router = express.Router();
const db = require('@/db');
const auth = require('@/utils/auth');

router.delete("/archives/:id", auth, async (req, res) => {
    if (req.authentication != 'teacher') {
        res.status(401);
        return false;
    };
    let sql = `DELETE FROM archives WHERE id='${req.params.id}';`
    let [row] = await db.query(sql);
    let isSuccess = !!row.affectedRows;

    res.json({
        success: isSuccess,
        message: isSuccess ? '删除成功' : '删除失败',
    });
});
module.exports = router;