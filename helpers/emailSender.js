const nodemailer = require('nodemailer');
const config = require('../config/main.json');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const user = config.user;

const transport = nodemailer.createTransport(sendgridTransport(
    {
        auth: {
           api_key: 'your_key'
        },
    }
));

async function sendConfirmationEmail (name, email, confirmationCode) {
    try {
        let info = await transport.sendMail({
            from: user,
            to: email,
            subject: "Please confirm your account",
            html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
        </div>`,
        })
    } catch (e) {
        console.error(e)
        const error = new Error(`Confirmation email wasn't sending`);
        error.code = 500;
        throw error;
    }

};

module.exports = sendConfirmationEmail;
