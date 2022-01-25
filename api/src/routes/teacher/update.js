const express = require('express');
const router = express.Router();
const db = require('@/db');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const moment = require('moment');
const admin = require('@/utils/admin');


router.put('/teacher/:id',admin, async (req, res) => {
    let {
        name,
        sex,
        time,
        _class
    } = req.body;

    let id = req.params.id;

    let tea_class = _class ? `'${_class}'` : null;

    let sql = `UPDATE teacher SET 
    name='${name}',
    sex='${sex}',
    time='${moment(new Date(time)).format('YYYY-MM-DD')}}',
    class=${tea_class} WHERE id='${id}';`
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

        if (req.files?.image) {
            sharp(req.files.image.data)
            .jpeg({
                quality: 50
            })
            .toFile(path.join(__dirname, `../../../public/image/${id}.jpg`), (err, info) => {})
        }
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