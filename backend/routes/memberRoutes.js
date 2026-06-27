const express = require("express");

const {
    getMembers,
    addMember
} = require("../controllers/memberController");

const router = express.Router();

// Get All Users
router.get("/", getMembers);

// Add Member To Project
router.post("/", addMember);

module.exports = router;