const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const { postLogin } = require('../controllers/loginController');
const { getSignup, postSignup } = require('../controllers/signupController');
const confirmEmail = require('../controllers/confirmationController');
// only for development
const verifyToken = require('../controllers/jwtController');

router.get('/', indexController.index);
router.get('/signup', getSignup);
router.post('/signup', postSignup)
router.post('/login', postLogin);
router.get('/confirm', confirmEmail);
// only for development
router.get('/check', verifyToken);

module.exports = router;
