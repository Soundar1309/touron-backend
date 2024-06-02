const moment = require("moment");
const mongoose = require("mongoose");

const bookTourSchema = mongoose.Schema(
  {
    name: String,
    mobileNumber: Number,
    date: {
      type: Date,
      required: true,
    },
    travelType: String,
    destination: String,
    adult: Number,
    child: Number,
    assignedTo: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BookTour", bookTourSchema);
