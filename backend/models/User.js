const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        default: ""
    },

    phone: {
        type: String,
        default: ""
    },

    bio: {
        type: String,
        default: ""
    },

    location: {
        type: String,
        default: ""
    },

    joined: {
        type: Date,
        default: null
    },

    role: {
        type: String,
        enum: ["Admin", "Member"],
        default: "Member"
    }

},
{
    timestamps: true
}
);

module.exports = mongoose.model("User", userSchema);