const express = require("express");

const {
    createComment,
    getComments
} = require("../controllers/commentController");

const router = express.Router();

// Add Comment
router.post("/", createComment);

// Get Comments of a Task
router.get("/:taskId", getComments);

module.exports = router;