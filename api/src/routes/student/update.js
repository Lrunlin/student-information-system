const express = require('express');
const router = express.Router();
const db = require('@/db');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const moment = require('moment');
const auth = require('@/utils/auth');


router.put('/student/:id', auth, async (req, res) => {
    if (req.authentication == 'student') {
        res.status(401);
        return false;
    };
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

    let id = req.params.id;

    let sql = `UPDATE student SET 
    name='${name}',
    sex='${sex}',
    time='${moment(new Date(time)).format('YYYY-MM-DD')}',
    college='${college}',
    major='${major}',
    class='${_class}',
    id_number='${id_number}',
    address='${address}' WHERE id='${id}';`


    try {
        let [row] = await db.query(sql);
        let isSuccess = !!row.affectedRows;

        if (!isSuccess) {
            res.json({
                success: false,
                message: '更新失败'
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
            message: '更新成功'
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: '更新失败'
        })
    }

});
module.exports = router;