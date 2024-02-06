const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: { type: String },
  title: { type: String },
  comment: { type: String },
});
const faqSchema = new mongoose.Schema({
  question: { type: String },
  answer: { type: String },
});

// Main schema
const itineryDetailSchema = mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
    },
    inclusion: {
      type: String,
    },
    weather: {
      type: String,
    },
    review: {
      type: [reviewSchema],
    },
    faq: {
      type: [faqSchema],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ItineryDetail", itineryDetailSchema);
