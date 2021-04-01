const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const { getLogin, postLogin } = require('../controllers/loginController');

router.get('/', indexController.index);
router.get('/login', getLogin);
router.post('/login', postLogin);


module.exports = router;
