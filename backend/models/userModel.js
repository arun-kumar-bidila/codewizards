const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    skills: {
        type: [String], 
        default: [] 
    },
    educationLevel: {
        type: String,
        enum: ["Undergraduate", "Graduate"],
       required:true 
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
