const express = require('express');
const router = express.Router();
const db = require('@/db');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const moment = require('moment');
const auth = require('@/utils/auth');


router.put('/password', auth, async (req, res) => {
    let {
        password
    } = req.body;

    let sql = `UPDATE ${req.authentication} SET 
    password = '${password}'  WHERE id='${req.id}';`

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
        res.json({
            success: true,
            message: '更新成功'
        })
    } catch (error) {
        res.json({
            success: false,
            message: '更新失败'
        })
    }

});
module.exports = router;