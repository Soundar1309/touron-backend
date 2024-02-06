const mongoose = require("mongoose")

const teamMembersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,     
    },
    designation: {
        type: String,
        required: true,     
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
},{
    timestamps: true
})

module.exports = mongoose.model("Team", teamMembersSchema)

