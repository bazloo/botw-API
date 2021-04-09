const jwt = require('jsonwebtoken');
const { Athlete } = require('../database/Schema/models');

async function verifyToken(req, res) {
    if (req.headers.authorization !== undefined) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = await jwt.decode(token);
            const user = await Athlete.findOne({ _id: decoded._id });
            if(!user){
                const error = new Error('Wrong Token');
                error.code = 400;
                throw error;
            }
            const result = await jwt.verify(token, user.secret, (err, decoded) => {
                // do something with err
                if (decoded) return true;
            });
            res.send(result)

        } catch (e) {
            console.error(e);
            res.status(e.status).send({
                message: e.message
            })
        }
    } else {
        console.error('JWT is absent');
        res.status(400).send({
            message: 'Not authorised'
        })
    }
}

module.exports = verifyToken;
