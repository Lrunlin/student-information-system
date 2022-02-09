const express = require('express');
const router = express.Router();
const db = require('@/db');
const moment = require('moment');
const md5 = require('md5');
const auth = require('@/utils/auth');


router.put('/archives/:id', auth, async (req, res) => {
    if (req.authentication != 'teacher') {
        res.status(401);
        return false;
    };
    let {
        time,
        title,
        content
    } = req.body;

    let sql = `UPDATE archives SET time='${moment(new Date(time)).format('YYYY-MM-DD hh:mm:ss')}',teacher='${req.id}',title='${title}',content='${content}' WHERE id='${req.params.id}';`


    try {
        let [row] = await db.query(sql);
        let isSuccess = !!row.affectedRows;

        if (!isSuccess) {
            res.json({
                success: false,
                message: '创建失败'
            });
            return false;
        }

        res.json({
            success: true,
            message: '创建成功'
        })
    } catch (error) {
        res.json({
            success: false,
            message: '创建失败'
        })
    }

});
module.exports = router;