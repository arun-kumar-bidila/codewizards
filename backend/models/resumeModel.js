const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to logged-in user
    phone: { type: String, required: true },
    linkedin: { type: String },
    github: { type: String },
    projects: [
        {
            title: String,
            description: String,
            technologies: [String],
        }
    ],
    education: [
        {
            institution: String,
            degree: String,
            year: String
        }
    ],
    certifications: [
        {
            title: String,
            organization: String,
            year: String
        }
    ]
}, { timestamps: true });

const Resume = mongoose.model("Resume", resumeSchema);
module.exports = Resume;
