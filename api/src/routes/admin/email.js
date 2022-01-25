const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer')
const db = require('@/db');
const email = require('@/utils/email');
const admin = require('@/utils/admin');

router.post("/email/:identity",admin, async (req, res, next) => {
    let [rows] = await db.query(`select email from ${req.params.identity};`);
    let result = await email(req.body.title, req.body.content, rows.map(item => item.email).join(','))
    res.json(result)
});
module.exports = router;