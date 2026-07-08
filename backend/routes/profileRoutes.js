const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
    getProfile,
    updateProfile,
    changePassword
} = require("../controllers/profileController");

const router = express.Router();

router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);
router.post("/change-password", protect, changePassword);

module.exports = router;
