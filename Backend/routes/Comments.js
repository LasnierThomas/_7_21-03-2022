const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/Comments');
const authMiddleware = require("../middleware/auth");



router.get("/:articleId", authMiddleware, commentsCtrl.getAllComments);
router.post("/", authMiddleware, commentsCtrl.createComments);
// router.put('/:id', auth, CommentsCtrl.modifyComments);
// router.delete('/:id', auth, CommentsCtrl.deleteComments);

module.exports = router;