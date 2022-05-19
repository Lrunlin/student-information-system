const express = require('express');
const router = express.Router();
const db = require('@/db');
const auth = require('@/utils/auth');

router.get('/weekly/teacher', auth, async (req, res) => {
    let [_classList] = await db.query(`select class from teacher where id='${req.id}'`);
    let classList = _classList[0].class.split(',');
    let data = [];
    let studentList = [];
    //先察看自己班级的学生列表
    for (let index = 0; index < classList.length; index++) {
        let [_stu] = await db.query(`select * from student where class='${classList[index]}';`)
        studentList = [...studentList, ..._stu];
    };

    // 查询每个学生的周报
    for (let index = 0; index < studentList.length; index++) {
        let [_week] = await db.query(`select * from weekly where student_id='${studentList[index].id}';`)
        data = [...data, ..._week.sort((a, b) => a.week_time - b.week_time).map(item => Object.assign(item, {
            student: studentList[index]
        }))]
    }


    res.json({
        success: true,
        message: '教师查询本班学生信息以及周报',
        data:data
    })
});
module.exports = router;

