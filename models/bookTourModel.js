const moment = require("moment");
const mongoose = require("mongoose");

const bookTourSchema = mongoose.Schema(
  {
    name: String,
    mobileNumber: Number,
    date: {
      type: Date,
      required: true,
      set: (value) => moment(value, "DD/MM/YYYY").toDate(), // Parse the date
    },
    destination: String,
    adult: Number,
    child: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BookTour", bookTourSchema);
