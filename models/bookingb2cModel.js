const mongoose = require("mongoose");

const bookingB2CSchema = mongoose.Schema(
  {
    status: {
      type: String,
      default: "Query Received",
    },
    handledBy: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    destination: {
      type: String,
    },
    travelWith: {
      type: String,
      required: true,
    },
    departureStation: {
      type: String,
      required: true,
    },
    dateItenary: {
      startDate: { type: String, required: true },
      endDate: { type: String, required: true },
    },
    tourPlan: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Itinery",
    },
    surveyId: {
      type: String,
      unique: true,
    },
    category: {
      type: String,
      enum: ["BookingB2B", "BookingB2C"],
      default: "BookingB2C",
    },
    planCategory: {
      type: String,
      default: "Trending Plan",
    },
    departureInDays: {
      type: String,
    },
    tourCost: {
      type: String,
    },
    queryFrom: {
      type: String,
      default: "Website",
    },
    travelType: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    noOfChild: {
      type: Number,
    },
    noOfAdults: {
      type: Number,
    },
    nearestBranch: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BookingB2C", bookingB2CSchema);
