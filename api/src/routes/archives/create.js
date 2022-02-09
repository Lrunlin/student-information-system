const express = require('express');
const router = express.Router();
const db = require('@/db');
const moment = require('moment');
const md5 = require('md5');
const auth = require('@/utils/auth');


router.post('/archives', auth, async (req, res) => {
    if (req.authentication != 'teacher') {
        res.status(401);
        return false;
    };
    let {
        student,
        time,
        title,
        content
    } = req.body;

    let id = md5(req.id + JSON.stringify(req.body)); //防止重复

    let sql = `INSERT INTO archives ( id, student,teacher,title,content,time)
                       VALUES
             ('${id}','${student}','${req.id}','${title}','${content}','${moment(new Date(time)).format('YYYY-MM-DD hh:mm:ss')}');`

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