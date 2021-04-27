const db = require('../database/dbQueries');
const ScoreIncreaser = require('../services/ScoreIncreaser');

async function getScore (req, res) {
    const result = await db.getAthleteOrderingByScore({}, ['points']);
    res.send(result);
}

async function getScoreOfWeek (req, res) {

}

async function increaseUserScore (req, res) {
    try {
        const scoreIncreaser = new ScoreIncreaser();
        const response = await scoreIncreaser.run(req.body);
        res.send(response);
    } catch (e) {
        console.error(e);
        res.status(e.code).send({ message: e.message});
    }
}

module.exports = {
    getScore,
    getScoreOfWeek,
    increaseUserScore
}
