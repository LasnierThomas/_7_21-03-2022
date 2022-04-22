const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
<<<<<<< HEAD
// router.post('/login', userCtrl.login);
=======
router.post('/login', userCtrl.login);
>>>>>>> d22be14868a04b92213e3a4c0e5d2935c0c2c8e3
router.get('/testLogin', userCtrl.testLogin);

module.exports = router;