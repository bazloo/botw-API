const db = require('../database/dbQueries');

async function confirmEmail(req, res) {
    try {
        const user = await db.findAthlete(req.query);
        if (user === undefined){
            console.error('User not found');
            res.status(400).send({
                message: 'User not found'
            });
        }
        user.status = 'Active';
        db.updateAthlete(user._id, { status: 'Active' });
        console.log(user);
        res.send({
            successfulConfirmation: {
                id: user._id,
                name: user.name,
                login: user.login
            }
        });
    } catch (e) {
        console.error(e);
    }
}

module.exports = confirmEmail;
