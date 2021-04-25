const UserRankGetter = require('../services/UserRankGetter');

async function getAthleteRankAmongAll(req, res) {
    try {
        const userRankGetter = new UserRankGetter();
        const result = await userRankGetter.run(req.body);
        res.send(result);
    } catch (e) {
        res.status(400).send({ message: e.message });
    }

}


module.exports = getAthleteRankAmongAll;
