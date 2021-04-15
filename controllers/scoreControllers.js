const db = require('../database/dbQueries');
const ScoreService = require('../services/ScoreService');

async function getScore (req, res) {
    const result = await db.getAthlete();
    res.send(result);
}

async function getScoreOfWeek (req, res) {

}

async function updateUserScore (req, res) {
    try {
        const scoreService = new ScoreService();
        const response = await scoreService.run(req.body);
        res.send(response);
    } catch (e) {
        console.error(e);
        res.status(e.code).send({ message: e.message});
    }
}

module.exports = {
    getScore,
    getScoreOfWeek,
    updateUserScore
}
