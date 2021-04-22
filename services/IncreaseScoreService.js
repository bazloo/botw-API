const CommonService = require('./CommonService');
const LIVR = require('livr');
LIVR.Validator.defaultAutoTrim(true);
const db = require('../database/dbQueries');

class IncreaseScoreService extends CommonService {
    async validate(params) {
        const validator = new LIVR.Validator(
            {
                _id: ['required'],
                points: [
                    {
                        one_of: [
                            3,
                            2,
                            1
                        ]
                    }
                ]
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
            const {_id, points} = params;
            const result = await db.increaseAmount(_id, points);
            return result;
            // maybe a good idea is to update the score page after that
        } catch (e) {
            console.error(e);
        }
    }


}

module.exports = IncreaseScoreService;
