const express = require('express');
const router = express.Router();
const db = require('@/db');
const auth = require('@/utils/auth');


router.put('/weekly/teacher/:id', auth, async (req, res) => {
    let {
        reply,
        modifiable
    } = req.body;
    let id = req.params.id;
    let sql = `UPDATE weekly SET modifiable=${modifiable}, reply='${reply}' WHERE id='${id}';`
    let [row] = await db.query(sql);
    let isSuccess = !!row.affectedRows;
    res.json({
        success: isSuccess,
        message: isSuccess ? '更新成功' : '更新失败'
    });

});
module.exports = router;