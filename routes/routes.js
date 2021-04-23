const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const { getSignup, postSignup, postLogin, confirmEmail } = require('../controllers/registrationControllers');
const { getScore, getScoreOfWeek, increaseUserScore } = require('../controllers/scoreControllers');
const getAthleteRankAmongAll = require('../controllers/rankingController');
const makeComplain = require('../controllers/honorController');

// only for development
const verifyToken = require('../controllers/jwtController');

router.get('/', indexController.index);
router.get('/signup', getSignup);
router.post('/signup', postSignup)
router.post('/login', postLogin);
router.get('/confirm', confirmEmail);
router.get('/score', getScore);
router.get('/rank', getAthleteRankAmongAll);
router.patch('/route-done', increaseUserScore);
router.patch('/complain', makeComplain)
// only for development
router.get('/check', verifyToken);

module.exports = router;
