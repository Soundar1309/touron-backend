const mongoose = require("mongoose")

const testimonialsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,     
    },
    comment: {
        type: String,
        required: true,     
    },
    tourPlace: {
        type: String,
        required: true,     
    },
    field: {
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

module.exports = mongoose.model("Testimonial", testimonialsSchema)

