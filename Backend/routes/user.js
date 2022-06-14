const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', authMiddleware, userCtrl.userInfo);
router.delete('/:userId', userCtrl.deleteUser);

module.exports = router;