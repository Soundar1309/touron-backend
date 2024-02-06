const mongoose = require("mongoose")

const loginSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,     
    },
    email: {
        type: String,
        required: true,     
    },
    mobileNumber: {
        type: String,
        required: true,     
    },
},{
    timestamps: true
})

module.exports = mongoose.model("User", loginSchema)