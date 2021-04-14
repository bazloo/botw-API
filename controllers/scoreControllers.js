const db = require('../database/dbQueries');

async function getScore (req, res) {
    const result = await db.getAthlete();
    res.send(result);
}

function getScoreOfWeek (req, res) {

}
module.exports = {
    getScore,
    getScoreOfWeek
}
