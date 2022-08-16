const {MAIL_SERVICE, MAIL_USERNAME, MAIL_PASSWORD, HTTP_STATUS, SUCCESS_MESSAGE} = require('../lib/constants');
const nodemailer = require('nodemailer');
//transporter for nodemailer
const transporter = nodemailer.createTransport({
    service: MAIL_SERVICE,
    // host: "smtp.gmail.com",
    auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
    },
    secure: true,
});
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log(success);
    }
});
module.exports.sendEmail = async function (obj) {
    try {
        //mail options
        const mailOptions = {
            from: MAIL_USERNAME,
            to: obj.email,
            subject: obj.subject,
            html: obj.html,
        };
        return await transporter.sendMail(mailOptions);
    } catch (error) {
        return error;
    }
}