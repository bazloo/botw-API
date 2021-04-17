const CommonService = require('../services/CommonService')
const LIVR = require('livr');
LIVR.Validator.defaultAutoTrim(true);
const db = require('../database/dbQueries');

class ComplainService extends CommonService {
    async validate(params) {
        const validator = new LIVR.Validator(
            {
                blame: {
                    _id: ['required']
                },
                from : {
                    _id: ['required'],
                    comment: [{ max_length: 100 }]
                }
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
            const accusedUser = await db.findAthlete({ _id: params.blame._id });
            if (!accusedUser) {
                console.error('User not found');
                const error = new Error('User not found');
                error.code = 404;
                throw error;
            }
            if (accusedUser.blaming.complaint >= 2){
                db.updateAthlete(accusedUser._id, { strike: true });

                // should push comment to an Array
            }
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = ComplainService;
