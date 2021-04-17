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
            points: {type: Number, default: 0},
            routesDone: {type: Number},
            blaming: {
                complaint: {type: Number},
                comments: {type: Array}
            },
            strike: {type: Boolean},
            emailVerifiedAt: { type: Number },
            password: { type: String, required },
            secret: {
                type: String,
                default: null
            },
            status: {
                type: String,
                enum: ['Pending', 'Active'],
                default: 'Pending'
            },
            confirmationCode: {
                type: String,
                unique: true },
                loggedAt: { type: Number }
        }
    )
)
module.exports = { Athlete } ;
