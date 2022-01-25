const nodemailer = require('nodemailer')

async function email(title, content, users) {
    let transporter = nodemailer.createTransport({
        service: "qq",
        port: 587,
        secure: false,
        auth: {
            user: "353575900@qq.com",
            pass: "mcnntrlfnjkjcaae",
        },
    });


    let mailOptions = {
        from: "353575900@qq.com",
        to: users,
        subject: title,
        html: content,
    };
    try {
        let info = await transporter.sendMail(mailOptions)
        return {
            success: true,
            message: "发送成功",
        }
    } catch (error) {
        return {
            success: false,
            message: "发送失败",
        };
    }
};
module.exports = email;