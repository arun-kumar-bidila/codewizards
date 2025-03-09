const express = require("express");
const router = express.Router();
const { createResume, getResumeByUserId } = require("../controllers/resumeController");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware for authentication

// Route to create a new resume (Requires authentication)
router.post("/", authMiddleware, createResume);



module.exports = router;
