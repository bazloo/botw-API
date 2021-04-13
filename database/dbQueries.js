const { Athlete } = require('./Schema/models');

module.exports = {
    findAthlete,
    updateAthlete
};

async function findAthlete (params) {
    const athlete = await Athlete.findOne(params);
    return athlete;
}

async function updateAthlete ( id, params) {
    const athlete = await Athlete.findByIdAndUpdate(id, params);
    return athlete;
}