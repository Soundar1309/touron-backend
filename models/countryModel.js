const mongoose = require("mongoose");

const CountrySchema = mongoose.Schema(
  {
    currency: String,
    timeZone: String,
    bestTimeToVisit: [String],
    countryName: {
      type: String,
      required: true,
    },
    continentName: {
      type: String,
      required: true,
    },
    aboutCountry: String,
    idealDays: String,
    imageUrl: String,
    weather: String,
    onArrival: String,
    cost: Number,
    bestPlaces: String,
    countryFlagImage: String,
    category: {
      type: String,
      default: "Trending Plan",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Country", CountrySchema);
