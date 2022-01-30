const express = require('express');
const router = express.Router();
const db = require('@/db');
const moment = require('moment');
const md5 = require('md5');
const auth = require('@/utils/auth');


router.get('/vacation', auth, async (req, res) => {
    if (req.authentication == 'student') {
        let sql = `select * from vacation where student='${req.id}';`;
        let [rows] = await db.query(sql);
        res.json({
            success: true,
            message: `查询学生${req.id}的请假记录`,
            data: rows
        })
        return false;
    };
    
    //获取教师管理的班级，在查询班级中每一位学生是否有请假记录
    if (req.authentication == 'teacher') {
        let [TeacherClassRows] = await db.query(`select class from teacher where id='${req.id}';`);
        let _class = TeacherClassRows[0].class.split(','); //教师管理的班级
        let _student = [];
        for (let index = 0; index < _class.length; index++) {
            const item = _class[index];
            let [_stu] = await db.query(`select id from student where class='${item}';`)
            _student.push(..._stu);
        }
        let data = [];
        for (let i = 0; i < _student.length; i++) {
            const item = _student[i].id;
            let [row] = await db.query(`select * from vacation where student='${item}';`)
            data.push(...row);
        }
        res.json({
            success: true,
            message: `查询教师 ${req.id} 管理同学的请假记录`,
            data: data
        })
        return false;
    };

});
module.exports = router;