const City = require("../models/internationalCityModel");
const Country = require("../models/countryModel");
const State = require("../models/domesticStateModel");
const DomesticCity = require("../models/domesticCityModel");

const getAllCountriesWithCities = async (req, res) => {
  try {
    const countries = await Country.find({}).sort({ countryName: 1 });
    const cities = await City.find({}).select({ countryName: 1, cityName: 1, _id: 1 }).sort({ cityName: 1 });

    const response = countries.map((country) => ({
      countryId: country._id,
      countryName: country.countryName,
      continentName: country.continentName,
      cities: cities.filter((city) => city.countryName === country.countryName),
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

const getAllStatesWithCities = async (req, res) => {
  try {
    const states = await State.find({}).sort({ stateName: 1 });
    const cities = await DomesticCity.find({}).select({ stateName: 1, cityName: 1, _id: 1 }).sort({ cityName: 1 });

    const response = states.map((state) => ({
      stateId: state._id,
      stateName: state.stateName,
      cities: cities.filter((city) => city.stateName === state.stateName),
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

module.exports = {
  getAllCountriesWithCities,
  getAllStatesWithCities
};
