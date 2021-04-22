const db = require('../database/dbQueries');
const IncreaseScoreService = require('../services/IncreaseScoreService');

async function getScore (req, res) {
    const result = await db.getAthlete();
    res.send(result);
}

async function getScoreOfWeek (req, res) {

}

async function increaseUserScore (req, res) {
    try {
        const increaseScoreService = new IncreaseScoreService();
        const response = await increaseScoreService.run(req.body);
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
