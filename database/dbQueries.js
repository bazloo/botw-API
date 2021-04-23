const { Athlete } = require('./Schema/models');

module.exports = {
    findAthlete,
    updateAthlete,
    getAthleteOrderingByScore,
    increaseAmount,
    createArhlete
};
async function createArhlete (params) {
    const athlete = await Athlete.create(params);
    return athlete;
}

async function findAthlete (params = {}, withdrawalCondition = []) {
    const athlete = await Athlete.findOne(params, withdrawalCondition);
    return athlete;
}

async function updateAthlete ( id, params) {
    const athlete = await Athlete.findByIdAndUpdate(id, params);
    return athlete;
}

async function getAthleteOrderingByScore (params = {}, withdrawalCondition = []) {
    const athlete = await Athlete.find(params, withdrawalCondition).sort({ points : -1 });
    return athlete;
}

async function increaseAmount (id, params) {
    const athlete = await Athlete.findByIdAndUpdate(id, {$inc: { params }});
    return athlete
}
