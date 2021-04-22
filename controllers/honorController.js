const ComplainServise = require('../services/ComplainService');

async function makeComplain (req, res) {
    try {
        const complainServise = new ComplainServise();
        const response = await complainServise.run(req.body);
        res.send(response);
    } catch (e) {
        console.error(e);
        res.send({ message: e.message});
    }
}

module.exports = makeComplain;
