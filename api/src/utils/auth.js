const jwt = require('jsonwebtoken');
/** 登录了就可以使用*/
function auth(req, res, next) {
    let token = req.headers.authorization + "";
    jwt.verify(token, '学生档案管理系统', function (err, decoded) {
        if (decoded) {
            req.authentication = decoded.authentication;
            req.id = decoded.id;
            next();
        } else {
            res.status(401);
            res.end();
        }
    });
};
module.exports = auth;