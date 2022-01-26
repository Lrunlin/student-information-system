const express = require('express');
const router = express.Router();
const db = require('@/db');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const moment = require('moment');
const pinyin = require('pinyin');
const admin = require('@/utils/admin');


router.post('/student', admin, async (req, res) => {
    let {
        name,
        sex,
        time,
        college,
        major,
        _class,
        id_number,
        address,
    } = req.body;
    let [countName] = await db.query(`select count(id) from student where name='${name}'`);
    let count = (countName[0]['count(id)'] + 1) < 10 ? `0${countName[0]['count(id)']+1}` : countName[0]['count(id)'] + 1
    let id = `${pinyin(name, {
                 style: pinyin.STYLE_NORMAL,
             }).join('')}${count}`;
    let _time = moment(new Date(time)).format('YYYY-MM-DD');
    let sql = `INSERT INTO student ( id, password,name,sex,college,major,class,time,id_number,address)
                       VALUES
             ('${id}', '${id}', '${name}', '${sex}','${college}','${major}','${_class}','${_time}','${id_number}','${address}');`

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
        res.json({
            success: false,
            message: '创建失败'
        })
    }

});
module.exports = router;