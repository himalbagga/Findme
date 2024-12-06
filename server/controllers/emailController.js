const nodemailer = require('nodemailer');

const sendMail = async (email, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "donotreplyfindme4@gmail.com",
            pass: "Findme@1234",
        },
        debug: true,
    });

    await transporter.sendMail({
        from: "donotreplyfindme4@gmail.com",
        to: email,
        subject,
        text: message,
    });
};

module.exports = { sendMail };