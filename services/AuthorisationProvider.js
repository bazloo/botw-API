const {Athlete} = require('../database/Schema/models');
const Base = require('./Base');
const LIVR = require('livr');
LIVR.Validator.defaultAutoTrim(true);
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/main.json')

class AuthorisationProvider extends Base {
    async validate(params) {
        const validator = new LIVR.Validator(
            {
                login: ['required', {min_length: 4, max_length: 50}],
                password: ['required', {min_length: 8, max_length: 50}],
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

        // should I add lastLogin field here?

        return correctData;
    }

    async execute(params) {
        const user = await this._findUserbyLogin(params.login);
        if (user.status === 'Pending') {
            console.error(`Email is not confirmwd yet for user: ${user.login}`);
            const error = new Error('Not confirmed email')
            error.code = 400;
            throw error;
        }
        const pass = await this._hashData(params.password, user.secret);
        if (user.password !== pass){
            console.error('Wrong login or password');
            const error = new Error('Wrong login or password');
            error.code = 400;
            throw error;

        }
        try {
            const token = jwt.sign(
                { login: user.login, _id: user.id },
                user.secret,
                { expiresIn: `${config.tokenLifeTime}s` },
            );
            return token;
        } catch (e) {
            console.error(e);
            // should catch errors here
        }
    }

    async _findUserbyLogin(login){
        const result = await Athlete.findOne({login: login});
        if(result) return result;

        console.error('User not found');

        const error = new Error('User not found');
        error.code = 404;
        throw error;
    }

    async _hashData(pass, salt) {
        const hashedPass = crypto.pbkdf2Sync(pass, salt, 1000, 32, 'sha512')
            .toString('hex');
        return hashedPass;
    }
}

module.exports = AuthorisationProvider;
