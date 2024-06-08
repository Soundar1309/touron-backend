const City = require("../models/internationalCityModel");
const Country = require("../models/countryModel");
const State = require("../models/domesticStateModel");
const DomesticCity = require("../models/domesticCityModel");

const getAllCountriesWithCities = async (req, res) => {
  try {
    const countries = await Country.find({}).sort({ countryName: 1 });
    const cities = await City.find({}).sort({ cityName: 1 });

    const countryCityMap = {};

    cities.forEach((city) => {
      if (!countryCityMap[city.countryName]) {
        countryCityMap[city.countryName] = [];
      }
      countryCityMap[city.countryName].push({
        cityId: city._id,
        cityName: city.cityName,
      });
    });

    const response = countries.map((country) => ({
      countryId: country._id,
      countryName: country.countryName,
      continentName: country.continentName,
      cities: countryCityMap[country.countryName] || [],
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

const getAllStatesWithCities = async (req, res) => {
  try {
    const states = await State.find({}).sort({ stateName: 1 });
    const cities = await DomesticCity.find({}).sort({ cityName: 1 });

    const countryCityMap = {};

    cities.forEach((city) => {
      if (!countryCityMap[city.stateName]) {
        countryCityMap[city.stateName] = [];
      }
      countryCityMap[city.stateName].push({
        cityId: city._id,
        cityName: city.cityName,
      });
    });

    const response = states.map((state) => ({
      stateId: state._id,
      stateName: state.stateName,
      cities: countryCityMap[state.stateName] || [],
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
