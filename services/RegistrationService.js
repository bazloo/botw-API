const { Athlete } = require('../database/Schema/models');
const CommonService = require('./CommonService');
const LIVR = require('livr');
LIVR.Validator.defaultAutoTrim(true);

class RegistrationService extends CommonService {
    async validate(params) {
      const validator = new LIVR.Validator(
          {
            name: [{ min_length: 2, max_length: 50 }],
            login: ['required', { min_length: 4, max_length: 50 }],
            email: ['required', 'trim', 'email', 'to_lc'],
            password: ['required', { min_length: 8, max_length: 50 }],
            confirmPassword: ['required', { equal_to_field: 'password' }],
          }
      );
      const correctData = validator.validate(params);
      const errors = validator.getErrors();
      if (errors) {
        console.error('RegistrationService, validation error: ', errors);
        const error = new Error('Validation error');
        error.code = 400;
        throw error;
      }
      return correctData;
    }

    async generate(params) {
        const name = params.name;
        const login = params.login;
        const email = params.email;
        const password = params.password;
        try {
            const [existingEmail, existingLogin] = await Promise.all([
                Athlete.findOne({email}),
                Athlete.findOne({login})
            ]);
            if (existingEmail || existingLogin) {
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
            return athlete;
        } catch (e) {
            console.error(e);
            res.status(e.code).send({message: e.message})
        }
    }
}

module.exports = RegistrationService;
