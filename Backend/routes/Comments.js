const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/Comments');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

// router.get('/', auth, CommentsCtrl.getAllComments);
// router.post('/', multer, commentsCtrl.createComments);
// router.put('/:id', auth, multer, CommentsCtrl.modifyComments);
// router.delete('/:id', auth, CommentsCtrl.deleteComments);

module.exports = router;