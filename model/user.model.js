const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        trim: true, // Remove extra whitespace from the email
        lowercase: true // Store email in lowercase
    },
    password: {
        type: String,
        required: true
    },
    pdfs: [{
        type: Object, // Use mongoose.Schema.Types.ObjectId
        // Reference to another model (if applicable)
    }]
})

module.exports = mongoose.model("User", userSchema)
