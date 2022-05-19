const express = require('express');
const router = express.Router();
const db = require('@/db');
const moment = require('moment');
const md5 = require('md5');
const auth = require('@/utils/auth');


router.post('/reason', auth, async (req, res) => {
    let {
        content,
    } = req.body;

    let id = md5(req.id + JSON.stringify(req.body)); //防止重复
    let sql = `INSERT INTO vacation ( id, student,state,reason,time)
                       VALUES
             ('${id}','${req.id}',0,'${content}','${moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}');`
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