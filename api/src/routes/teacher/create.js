const express = require('express');
const router = express.Router();
const db = require('@/db');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const moment = require('moment');
const pinyin = require('pinyin');
const admin = require('@/utils/admin');


router.post('/teacher', admin,async (req, res) => {
    let {
        name,
        sex,
        time,
        _class
    } = req.body;
    let [countName] = await db.query(`select count(id) from teacher where name='${name}'`);
    let count = (countName[0]['count(id)'] + 1) < 10 ? `0${countName[0]['count(id)']+1}` : countName[0]['count(id)'] + 1
    let id = `${pinyin(name, {
                 style: pinyin.STYLE_NORMAL,
             }).join('')}${count}`
    let tea_class = _class ? `'${_class}'` : null
    let sql = `INSERT INTO teacher ( id, password,name,sex,class,time)
                       VALUES
             ('${id}', '${id}', '${name}', '${sex}',${tea_class},'${moment(new Date(time)).format('YYYY-MM-DD')}');`

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

        sharp(req.files.image.data)
            .jpeg({
                quality: 50
            })
            .toFile(path.join(__dirname, `../../../public/image/${id}.jpg`), (err, info) => {})
        res.json({
            success: true,
            message: '创建成功'
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: '创建失败'
        })
    }

});
module.exports = router;