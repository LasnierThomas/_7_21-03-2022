const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/Comments');
const authMiddleware = require("../middleware/auth");


router.get("/:articleId", authMiddleware, commentsCtrl.getAllComments);
router.post("/", authMiddleware, commentsCtrl.createComments);
router.delete('/:id', authMiddleware, commentsCtrl.deleteComments);
router.patch("/:id", authMiddleware, commentsCtrl.editComments);

module.exports = router;