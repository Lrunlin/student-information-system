const express = require('express');
const db = require('@/db');
const app = express();
const router = express.Router();
const fs = require('fs');
const path = require('path');
const admin = require('@/utils/admin');

router.delete('/teacher/:id',admin, async (req, res) => {
    let sql = `DELETE FROM teacher WHERE id='${req.params.id}';`
    let [row] = await db.query(sql)
    let isSuccess = !!row.affectedRows;
    if (isSuccess) {
        fs.unlinkSync(path.join(__dirname, `../../../public/image/${req.params.id}.jpg`))
    }
    res.json({
        success: isSuccess,
        message: isSuccess ? '删除成功' : '删除失败'
    })
})
module.exports = router;