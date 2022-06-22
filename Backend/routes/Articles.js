const express = require('express');
const router = express.Router();
const articlesCtrl = require('../controllers/Articles');
const authMiddleware = require('../middleware/auth');
const multer = require('../middleware/multer');

router.get('/', authMiddleware, articlesCtrl.getAllArticles);
// router.get('/:id', auth, articlesCtrl.getOneArticles);
router.post('/', multer, authMiddleware, articlesCtrl.createArticles);
// router.put('/:id', auth, multer, articlesCtrl.modifyArticles);
// router.delete('/:id', auth, articlesCtrl.deleteArticles);

module.exports = router;