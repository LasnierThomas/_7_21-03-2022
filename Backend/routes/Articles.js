const express = require('express');
const router = express.Router();
const articlesCtrl = require('../controllers/Articles');
const authMiddleware = require('../middleware/auth');
const multer = require('../middleware/multer');

router.get('/', authMiddleware, articlesCtrl.getAllArticles);
router.get("/:id", articlesCtrl.getOneArticles);
router.post("/", authMiddleware, multer, articlesCtrl.createArticles);
// router.put('/:id', authMiddleware, multer, articlesCtrl.modifyArticles);
router.delete("/:id", authMiddleware, articlesCtrl.deleteArticles);

module.exports = router;