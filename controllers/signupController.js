const RegistrationService = require('../services/RegistrationService');

async function getSignup(req, res) {
    res.send('Signup page');
}

async function postSignup(req, res) {
  try {
      const registration = new RegistrationService;
      const response = await registration.run(req.body);
      res.send(response);
  } catch (e) {
      console.error(e)
  }
}

module.exports = { getSignup, postSignup };
