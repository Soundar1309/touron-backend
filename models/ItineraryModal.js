const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: { type: String },
  rating: { type: String },
  comment: { type: String },
});
const faqSchema = new mongoose.Schema({
  question: { type: String },
  answer: { type: String },
});
const daysSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
});

// Main schema
const ItineraryDetailSchema = mongoose.Schema(
  {
    country: {
      type: String,
    },
    title: {
      type: String,
    },
    price: {
      type: String,
    },
    destination: {
      type: String,
    },
    duration: {
      type: String,
    },
    hotel: {
      type: String,
    },
    meals: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    topHighlights: {
      type: String,
    },
    tourPlanDescription: {
      type: String,
    },
    included: {
      type: [{
        type: String
      }],
    },
    excluded: {
      type: [{
        type: String
      }],
    },
    days: {
      type: [daysSchema],
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

module.exports = mongoose.model("Itinerary", ItineraryDetailSchema);
