const express = require('express');
const router = express.Router();
const db = require('@/db');
const auth = require('@/utils/auth');


router.put('/vacation/:id', auth, async (req, res) => {

    let {
        state,
        notes
    } = req.body;

    let id = req.params.id;

    let sql = `UPDATE vacation SET state='${state}', notes='${notes}' WHERE id='${id}';`

    let [row] = await db.query(sql);
    let isSuccess = !!row.affectedRows;

    res.json({
        success: isSuccess,
        message: isSuccess ? '更新成功' : '更新失败'
    });

});
module.exports = router;