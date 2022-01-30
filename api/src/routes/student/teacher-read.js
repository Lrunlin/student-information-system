const express = require('express');
const db = require('@/db');
const router = express.Router();
const auth = require('@/utils/auth');

router.get('/teacher-student', auth, async (req, res) => {

    let [classRows] = await db.query(`select class from teacher where id='${req.id}';`);
    if (!classRows.length) {
        res.json({
            success: false,
            message: '未找到对应的教师',
            data: []
        })
        return false;
    }
    let _class = classRows[0].class.split(',');

    let _student = [];
    for (let index = 0; index < _class.length; index++) {
        const item = _class[index];
        let [_stu] = await db.query(`select * from student where class='${item}';`)
        _student.push(..._stu)
    }

    res.json({
        success: !!_student,
        message: `查询教师: ${req.id} 所管理的学生`,
        data: _student
    });
})
module.exports = router;