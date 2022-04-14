const express = require('express');
const router = express.Router();

const articlesCtrl = require('../controllers/Articles');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.get('/', auth, articlesCtrl.getAllArticles);
router.get('/:id', auth, articlesCtrl.getOneArticles);
router.post('/', auth, multer, articlesCtrl.createArticles);
router.put('/:id', auth, multer, articlesCtrl.modifyArtciles);
router.delete('/:id', auth, articlesCtrl.deleteArticles);

router.exports = router;