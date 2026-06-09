const express = require("express");
const router = express.Router();
const { getPosts, getPostById, createPost, addComment, likePost } = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", protect, createPost);
router.post("/:id/comment", protect, addComment);
router.put("/:id/like", protect, likePost);

module.exports = router;