const express = require("express");

const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
} = require("../controllers/projectController");

const router = express.Router();

// Create Project
router.post("/", createProject);

// Get All Projects
router.get("/", getProjects);

// Get Single Project
router.get("/:id", getProjectById);

// Update Project
router.put("/:id", updateProject);

// Delete Project
router.delete("/:id", deleteProject);

module.exports = router;