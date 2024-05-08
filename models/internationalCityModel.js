const mongoose = require("mongoose");

const internationalCitySchema = new mongoose.Schema(
  {
    countryName: {
      type: String,
      required: true,
    },
    continentName: {
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
    foodJoints: String,
    thingsToPack: String,
    tips: String,
    documentsRequired: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("City", internationalCitySchema);
