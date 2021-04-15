const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const { postLogin } = require('../controllers/loginController');
const { getSignup, postSignup } = require('../controllers/signupController');
const confirmEmail = require('../controllers/confirmationController');
const { getScore, getScoreOfWeek, updateUserScore } = require('../controllers/scoreControllers');

// only for development
const verifyToken = require('../controllers/jwtController');

router.get('/', indexController.index);
router.get('/signup', getSignup);
router.post('/signup', postSignup)
router.post('/login', postLogin);
router.get('/confirm', confirmEmail);
router.get('/score', getScore);
router.patch('/route-done', updateUserScore);
// only for development
router.get('/check', verifyToken);

module.exports = router;
