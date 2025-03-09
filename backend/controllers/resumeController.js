const Resume = require("../models/resumeModel");
const User = require("../models/userModel");

const createResume = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from authenticated user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newResume = new Resume({
            userId,
            phone: req.body.phone,
            linkedin: req.body.linkedin,
            github: req.body.github,
            projects: req.body.projects,
            education: req.body.education,
            certifications: req.body.certifications
        });

        await newResume.save();

        res.status(201).json({
            message: "Resume created successfully",
            resume: {
                name: user.name, // Retrieved from User model
                email: user.email, // Retrieved from User model
                skills: user.skills, // Retrieved from User model
                ...newResume._doc
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { createResume };
