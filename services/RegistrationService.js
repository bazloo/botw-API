const db = require('../database/dbQueries');
const CommonService = require('./CommonService');
const LIVR = require('livr');
LIVR.Validator.defaultAutoTrim(true);
const crypto = require('crypto');
const sendConfirmationEmail = require('../helpers/emailSender');


class RegistrationService extends CommonService {
    async validate(params) {
        const validator = new LIVR.Validator(
            {
                name: [{min_length: 2, max_length: 50}],
                login: ['required', {min_length: 4, max_length: 50}],
                email: ['required', 'trim', 'email', 'to_lc'],
                password: ['required', {min_length: 8, max_length: 50}],
                confirmPassword: ['required', {equal_to_field: 'password'}],
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

        try {
            // Creating original salt for each yser,
            // it allows us to encrypt and decrypt data.
            // Not the most secure way, I will change it in future.
            const secret = await crypto.randomBytes(16).toString('hex');

            correctData.password = await this._hashData(correctData.password, secret);
            correctData.secret = secret;
            correctData.confirmationCode = await this._hashData(correctData.email, secret);
            correctData.status = 'Pending';
        } catch (e) {
            console.error(e)
            // should I throw a new error here to break the registration process?
        }

        return correctData;
    }

    async execute(params) {
        const { name, login, email, password, secret, confirmationCode, status } = params;

        try {
            const [existingEmail, existingLogin] = await Promise.all([
                db.findAthlete({ email }),
                db.findAthlete({ login })
            ]);
            if (existingEmail || existingLogin) {
                const error = new Error('This Login or Email already exists');
                error.code = 400;
                throw error;
            }
            const athlete = await db.createArhlete({
                name,
                login,
                email,
                password,
                secret,
                confirmationCode,
                status
            });

            sendConfirmationEmail(name ?? login, email, confirmationCode);
            console.log(athlete);
            return athlete;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async _hashData(pass, salt) {
       const hashedPass = crypto.pbkdf2Sync(pass, salt, 1000, 32, 'sha512')
            .toString('hex');
        return hashedPass;
    }
}

module.exports = RegistrationService;
