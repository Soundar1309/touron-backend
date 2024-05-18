const mongoose = require("mongoose");

const domesticCitySchema = new mongoose.Schema(
  {
    suggestedCombinations: String,
    stateName: {
      type: String,
      required: true,
    },
    cityName: {
      type: String,
      required: true,
    },
    aboutCity: String,
    imageUrl: String,
    weather: String,
    latitude: String,
    longitude: String,
    travelDuration: {
      type: String,
      required: true,
    },
    idealDays: {
      type: String,
      required: true,
    },
    famousPlacesToVisit: String,
    airportType: String,
    airportName: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Domesticcity", domesticCitySchema);
