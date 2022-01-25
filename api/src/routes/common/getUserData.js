const express = require("express");
const db = require("@/db");
const auth = require("@/utils/auth");
const router = express.Router();

router.get("/user", auth, async (req, res) => {
  let sql = `select * from ${req.authentication} where id='${req.id}';`;
  let [rows] = await db.query(sql);
  let isSuccess = !!rows.length;
  res.json({
    success: isSuccess,
    message: isSuccess ? "登录成功" : "账号或密码错误",
    data: isSuccess ? rows[0] : {},
    identity: req.authentication
  });
});
module.exports = router;