const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/Comments');
const authMiddleware = require("../middleware/auth");



router.get("/:articleId", authMiddleware, commentsCtrl.getAllComments);
router.post("/", authMiddleware, commentsCtrl.createComments);
router.put('/:id', authMiddleware, commentsCtrl.modifyComments);
router.delete('/:id', authMiddleware, commentsCtrl.deleteComments);

module.exports = router;