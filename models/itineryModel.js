const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
  morning: { type: String },
  afternoon: { type: String },
  evening: { type: String },
  night: { type: String },
});

// Main schema
const itinerySchema = mongoose.Schema(
  {
    itineryTitle: {
      type: String,
      required: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ItineryDetail",
    },
    cityname: {
      type: String,
    },
    noOfDays: {
      type: Number,
    },
    days: {
      type: [daySchema],
    },
    priceRangeStart: {
      type: Number,
    },
    priceRangeEnd: {
      type: Number,
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Itinery", itinerySchema);
