const db = require('../database/dbQueries');

async function getAthleteRankAmongAll(req, res) {
    const userId = req.body._id;
    const listOfObject = await db.getAthleteOrderingByScore({}, ['_id']);
    const arrOfId = listOfObject.map((i) => i = i._id);
    const rank = arrOfId.indexOf(userId);
    res.send(rank);
}


module.exports = getAthleteRankAmongAll;
