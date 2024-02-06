const City = require("../models//internationalCityModel");

// @desc    get all internationalcity in ascending order
// @route   GET /api/internationalcity/
// @access  public
const getCityByAscending = async (req, res) => {
  const city = await City.find({}).sort({ createdAt: -1 });
  res.json(city);
};

// @desc    get internationalcity by id
// @route   GET /api/internationalcity/:id
// @access  public
const getCitybyID = async (req, res) => {
  const city = await City.findById(req.params.id);
  if (city) {
    res.json(city);
  } else {
    res.status(404);
    throw new Error("City not found");
  }
};


// @desc    get all internationalcity by countryName
// @route   GET /api/internationalcity/state
// @access  public
const getCityByAscendingByCountry = async (req, res) => {
  try {
    const { countryName } = req.query; // Change from req.body to req.query
    if (!countryName) {
      return res.status(400).json({ error: "Country name is required" });
    }

    const cities = await City.find({ countryName: countryName }).sort({ name: 1 });
    if (cities.length === 0) {
      return res
        .status(404)
        .json({ error: "No cities found for the provided state" });
    }
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc    add internationalcity
// @route   POST /api/internationalcity/add
// @access  private
const addCity = async (req, res) => {
  const {
    countryName,
    cityName,
    aboutCity,
    imageUrl,
    weather,
    latitude,
    longitude,
    travelDuration,
    idealDays,
    famousPlacesToVisit,
    airportType,
    airportName,
    foodJoints,
    thingsToPack,
    tips,
    documentsRequired,
  } = req.body;

  const state = await City.create({
    countryName,
    cityName,
    aboutCity,
    imageUrl,
    weather,
    coordinates: {
      latitude,
      longitude,
    },
    travelDuration,
    idealDays,
    famousPlacesToVisit,
    airportType,
    airportName,
    foodJoints,
    thingsToPack,
    tips,
    documentsRequired,
  });
  await state.save();
  res.status(201).json(state);
};

// @desc    update internationalcity
// @route   POST /api/internationalcity/update/:id
// @access  private
const updateCity = async (req, res) => {
  try {
    const {
      countryName,
      cityName,
      aboutCity,
      imageUrl,
      weather,
      latitude,
      longitude,
      travelDuration,
      idealDays,
      famousPlacesToVisit,
      airportType,
      airportName,
      foodJoints,
      thingsToPack,
      tips,
      documentsRequired,
    } = req.body;
    const city = await City.findById(req.params.id);

    city.countryName = countryName;
    city.cityName = cityName;
    city.aboutCity = aboutCity;
    city.imageUrl = imageUrl;
    city.weather = weather;
    city.coordinates = {
      latitude,
      longitude,
    };
    city.travelDuration = travelDuration;
    city.idealDays = idealDays;
    city.famousPlacesToVisit = famousPlacesToVisit;
    city.airportType = airportType;
    city.airportName = airportName;
    city.foodJoints = foodJoints;
    city.thingsToPack = thingsToPack;
    city.tips = tips;
    city.documentsRequired = documentsRequired;

    await city.save();
    res.status(201).json(city);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    delete internationalcity
// @route   POST /api/internationalcity/delete
// @access  private
const deleteCity = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedCity = await City.findByIdAndDelete(id);
    res.status(200).json({ message: "City deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCityByAscending,
  getCitybyID,
 getCityByAscendingByCountry,
  addCity,
  updateCity,
  deleteCity,
};
