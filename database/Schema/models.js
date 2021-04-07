const mongoose = require('mongoose');
const { Schema } = mongoose;

const required = true;

const Athlete = mongoose.model(
    'Athlete', new Schema(
        {
            name: { type: String },
            login: { type: String, required },
            email: { type: String, required },
            avatarUrl: {type: String},
            points: {type: Number},
            routes: {type: Number},
            blaming: {type: Number},
            strike: {type: Boolean},
            emailVerifiedAt: { type: Number },
            password: { type: String, required },
            status: {
                type: String,
                enum: ['Pending', 'Active'],
                default: 'Pending'
            },
            confirmationCode: {
                type: String,
                unique: true },
        }
    )
)
module.exports = { Athlete } ;
