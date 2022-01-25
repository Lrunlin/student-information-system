const jwt = require('jsonwebtoken');
/** 
 * 管理员才可以访问
*/
function auth(req, res, next) {
    let token = req.headers.authorization + "";
    jwt.verify(token, '学生档案管理系统', function (err, decoded) {
        if (err) {
            res.status(401);
            res.end();
            return false;
        }
        if (decoded.authentication != 'admin') {
            res.status(401);
            res.end();
            return false;
        }
        req.authentication = decoded.authentication;
        req.id = decoded.id;
        next();
    });
};
module.exports = auth;