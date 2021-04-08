const { Athlete } = require('../database/Schema/models');

async function confirmEmail(req, res) {
    const user = await Athlete.findOne(req.query);
    if (user === undefined){
        console.error('User not found');
        res.status(400).send({
           message: 'User not found'
        });
    }
    const result = await Athlete.findByIdAndUpdate(user._id, { status: 'Active' });
    res.send(result);
}

module.exports = confirmEmail;
