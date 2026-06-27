const express = require("express");

const {

    createTask,
    getTasks,
    getMyTasks,
    updateTask,
    deleteTask

} = require("../controllers/taskController");

const router = express.Router();

// Create Task
router.post("/", createTask);
router.get("/my/:userId", getMyTasks);

// Get Tasks by Project
router.get("/:projectId", getTasks);

// Update Task
router.put("/:id", updateTask);

// Delete Task
router.delete("/:id", deleteTask);

module.exports = router;