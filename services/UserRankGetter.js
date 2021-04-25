const CommonService = require('./CommonService');
const LIVR = require('livr');
LIVR.Validator.defaultAutoTrim(true);
const db = require('../database/dbQueries');

class UserRankGetter extends CommonService {
    async validate(params) {
        const validator = new LIVR.Validator(
            {
                _id: ['required'],

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
        const userId = params._id;
        const listOfObject = await db.getAthleteOrderingByScore({}, ['_id']);
        const arrOfId = listOfObject.map((i) => i = i._id.toString());
        const amongActiveUsers = arrOfId.length;
        const rank = arrOfId.indexOf(userId) + 1;
        return {
            rank,
            amongActiveUsers
        }
    }


}

module.exports = UserRankGetter;
