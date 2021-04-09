const LoginService = require('../services/LoginService');

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

module.exports = { postLogin };
