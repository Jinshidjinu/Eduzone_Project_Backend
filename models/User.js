const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique in the database
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Basic email format validation
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
