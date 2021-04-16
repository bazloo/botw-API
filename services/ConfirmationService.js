const CommonService = require('../services/CommonService')
const LIVR = require('livr');
LIVR.Validator.defaultAutoTrim(true);
const db = require('../database/dbQueries');

class ConfirmationService extends CommonService {
    async validate(params) {
        const validator = new LIVR.Validator(
            {
                confirmationCode: ['required'],
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

    async execute(params) {
        try {
            const user = await db.findAthlete(params);
            if (user === undefined) {
                console.log('User not found')
                const error = new Error('User not found');
                error.status(400);
                throw error;
            }
            user.status = 'Active';
            await db.updateAthlete(user._id, {status: 'Active'});
            console.log(user);
            return {
                successfulConfirmation: {
                    id: user._id,
                    name: user.name,
                    login: user.login
                }
            };
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = ConfirmationService;
