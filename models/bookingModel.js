const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    userId: String,
    mobileNumber: String,
    dateOfPlanning: {
      type: Date,
      required: true,
    },
    dateOfBooking: {
      type: Date,
      required: true,
    },
    tourType: String,
    category: String,
    destination: String,
    accompany: String,
    adult: Number,
    child: Number,
    accommodation: [String],
    travelStyle: [String],
    budget: Number,
    adventure: Boolean,
    assignedTo: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
