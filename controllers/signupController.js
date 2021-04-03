const { Athlete } = require('../database/Schema/models');

async function getSignup(req, res) {
    res.send('Signup page');
}

async function postSignup(req, res) {
  const name = req.body.name;
  const login = req.body.login;
  const email = req.body.email;
  const password = req.body.password;
  try {
      const existingEmail = await Athlete.findOne({email});
      if (existingEmail){
          const error = new Error('This Login or Email is already exist');
          error.code = 400;
          throw error;
      }
      const athlete = await Athlete.create({
          name,
          login,
          email,
          password
      });
      res.send(athlete);
  } catch (e) {
      console.error(e);
      res.status(e.code).send({message: e.message})
  }
}

module.exports = { getSignup, postSignup };
