const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const { getLogin, postLogin } = require('../controllers/loginController');
const { getSignup, postSignup } = require('../controllers/signupController');
const confirmEmail = require('../controllers/confirmationController');

router.get('/', indexController.index);
router.get('/signup', getSignup);
router.post('/signup', postSignup)
router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/confirm', confirmEmail);

module.exports = router;
