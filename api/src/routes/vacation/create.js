const express = require('express');
const router = express.Router();
const db = require('@/db');
const moment = require('moment');
const md5 = require('md5');
const auth = require('@/utils/auth');


router.post('/reason', auth, async (req, res) => {
    let {
        start_time,
        end_time,
        reason
    } = req.body;

    let id = md5(req.id + JSON.stringify(req.body)); //防止重复
    let sql = `INSERT INTO vacation ( id, student,start_time,end_time,state,reason)
                       VALUES
             ('${id}','${req.id}','${moment(new Date(start_time)).format('YYYY-MM-DD')}','${moment(new Date(end_time)).format('YYYY-MM-DD')}',2,'${reason}');`
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