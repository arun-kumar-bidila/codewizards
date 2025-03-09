const express = require("express");
const { createUser, updateUserDetails,getUserDetails , loginUser } = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser); // Step 1: Create user (name & email)
router.put("/:id", updateUserDetails); // Step 2: Update skills, educationLevel, and experience
router.get("/:id", getUserDetails);
router.post("/login", loginUser);

module.exports = router;

