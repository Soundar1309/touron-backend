const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
  morning: { type: String },
  morningLat: { type: String },
  morningLng: { type: String },
  afternoon: { type: String },
  afternoonLat: { type: String },
  afternoonLng: { type: String },
  evening: { type: String },
  eveningLat: { type: String },
  eveningLng: { type: String },
  night: { type: String },
  nightLat: { type: String },
  nightLng: { type: String },
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
    image1: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    image2: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    image3: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    image4: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    image5: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Itinery", itinerySchema);
