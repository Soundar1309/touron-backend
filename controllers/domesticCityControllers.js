const City = require("../models/domesticCityModel");

// @desc    get all domesticcity in ascending order
// @route   GET /api/domesticcity/
// @access  public
const getCityByAscending = async (req, res) => {
  const city = await City.find({}).sort({ createdAt: -1 });
  res.json(city);
};

// @desc    get all domesticcity in ascending order by city
// @route   GET /api/domesticcity/city
// @access  public
const getCityByAscendingByCity = async (req, res) => {
  const city = await City.find({}).sort({ CityName: -1 });
  res.json(city);
};

// @desc    get all domesticcity by stateName
// @route   GET /api/domesticcity/state
// @access  public
const getCityByAscendingByState = async (req, res) => {
  try {
    const { stateName } = req.query; // Change from req.body to req.query
    if (!stateName) {
      return res.status(400).json({ error: "State name is required" });
    }

    const cities = await City.find({ stateName: stateName }).sort({ name: 1 });
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


// @desc    get domesticcity by id
// @route   GET /api/domesticcity/:id
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

// @desc    add domesticcity
// @route   POST /api/domesticcity/add
// @access  private
const addCity = async (req, res) => {
  const {
    countryName,
    suggestedCombinations,
    stateName,
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
  } = req.body;

  const state = await City.create({
    countryName,
    suggestedCombinations,
    stateName,
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
  });
  await state.save();
  res.status(201).json(state);
};

// @desc    update domesticcity
// @route   POST /api/domesticcity/update/:id
// @access  private
const updateCity = async (req, res) => {
  try {
    const {
      countryName,
      suggestedCombinations,
      stateName,
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
    } = req.body;
    const city = await City.findById(req.params.id);

    city.countryName = countryName;
    city.suggestedCombinations = suggestedCombinations;
    city.stateName = stateName;
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

    await city.save();
    res.status(201).json(city);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    delete domesticcity
// @route   POST /api/domesticcity/delete
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
  getCityByAscendingByCity,
  getCityByAscendingByState,
  getCitybyID,
  addCity,
  updateCity,
  deleteCity,
};
