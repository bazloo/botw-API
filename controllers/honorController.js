const ComplaintManager = require('../services/ComplaintManager');

async function makeComplain (req, res) {
    try {
        const complaintManager = new ComplaintManager();
        const response = await complaintManager.run(req.body);
        res.send(response);
    } catch (e) {
        console.error(e);
        res.send({ message: e.message});
    }
}

module.exports = makeComplain;
