const nodemailer = require('nodemailer');
const config = require('../config/main.json');

const user = config.user;

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user,
        pass: config.pass,
    },
});

async function sendConfirmationEmail (name, email, confirmationCode) {
    let info = await transport.sendMail({
        from: user,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
        </div>`,
    }).catch(err => console.log(err));
    // to do: throw new error here
};

module.exports = sendConfirmationEmail;
