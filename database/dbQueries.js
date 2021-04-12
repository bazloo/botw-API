const { Athlete } = require('./Schema/models');

module.exports = {
    findAthlete,
    updateAthleteById
};

async function findAthlete (params) {
    const athlete = await Athlete.findOne(params);
    return athlete;
}

async function updateAthleteById ( id, params) {
    const athlete = await Athlete.findByIdAndUpdate(id, params);
    return athlete;
}