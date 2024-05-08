const City = require("../models/internationalCityModel");
const Country = require("../models/countryModel");

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
      cities: countryCityMap[country.countryName] || [],
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

module.exports = {
  getAllCountriesWithCities,
};
