const mongoose = require('mongoose');
const { Schema } = mongoose;

const required = true;

const athlet = mongoose.model(
    'Athlet', new Schema(
        {
            name: { type: String, required },
            login: { type: String, required },
            email: { type: String, required },
            points: {type: Number},
            routes: {type: Number},
            blaming: {type: Number},
            strike: {type: Boolean},
            emailVerifiedAt: { type: Number },
            password: { type: String, required },
        }
    )
)
