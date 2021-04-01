const mongoose = require('mongoose');
const { Schema } = mongoose;

const required = true;

const athlet = mongoose.model(
    'Athlet', new Schema(
        {
            name: { type: String, required },
            login: { type: String, required },
            email: { type: String, required },
            avatarUrl: {type: String},
            points: {type: Number},
            routes: {type: Number},
            blaming: {type: Number},
            strike: {type: Boolean},
            emailVerifiedAt: { type: Number },
            password: { type: String, required },
        }
    )
)
module.exports = { athlet } ;
