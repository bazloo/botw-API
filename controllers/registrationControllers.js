const AccountCreator = require('../services/AccountCreator');
const AuthorisationProvider = require('../services/AuthorisationProvider');
const EmailConfirmationManager = require('../services/EmailConfirmationManager');

async function getSignup(req, res) {
    res.send('Signup page');
}

async function postSignup(req, res) {
    try {
        const accountCreator = new AccountCreator;
        const response = await accountCreator.run(req.body);
        res.send(response);
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
}

async function postLogin(req, res) {
    try {
        const authorisationProvider = new AuthorisationProvider();
        const response = await authorisationProvider.run(req.body)
        res.send(response);
    } catch (e) {
        console.error(e);
        res.status(e.code).send({ message: e.message });
    }
}

async function confirmEmail(req, res) {
    try {
        const emailConfirmationManager = new EmailConfirmationManager();
        let response = await emailConfirmationManager.run(req.query);
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
