const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
// router.get('/testLogin', userCtrl.testLogin);

module.exports = router;