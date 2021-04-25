const RegistrationService = require('../services/RegistrationService');
const LoginService = require('../services/LoginService');
const ConfirmationService = require('../services/ConfirmationService');

async function getSignup(req, res) {
    res.send('Signup page');
}

async function postSignup(req, res) {
    try {
        const registration = new RegistrationService;
        const response = await registration.run(req.body);
        res.send(response);
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
}

async function postLogin(req, res) {
    try {
        const loginServise = new LoginService();
        const response = await loginServise.run(req.body)
        res.send(response);
    } catch (e) {
        console.error(e);
        res.status(e.code).send({ message: e.message });
    }
}

async function confirmEmail(req, res) {
    try {
        const confirmationService = new ConfirmationService();
        let response = await confirmationService.run(req.query);
        res.send(response);
    } catch (e) {
        console.error(e);
        res.status(e.code).send({ message: e.message});
    }
}

module.exports = {
    getSignup,
    postSignup,
    postLogin,
    confirmEmail
};
