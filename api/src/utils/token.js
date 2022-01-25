const jwt = require('jsonwebtoken');


function setToken(id, authentication) {
    return jwt.sign({
        id: id,
        authentication: authentication
    }, '学生档案管理系统', {
        expiresIn: "180d",
        //有效设置180天吧
    })
}
module.exports = setToken;