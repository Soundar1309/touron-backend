const Country = require("../models/countryModel");

// @desc    get all country name in ascending order
// @route   GET /api/country/
// @access  public
const getAllCountry = async (req, res) => {
  const country = await Country.find({}).sort({ countryName: 1 });
  res.json(country);
};

// @desc    get all country name in ascending order autocomplete
// @route   GET /api/country/
// @access  public
const getAllCountryAutocomplete = async (req, res) => {
  const country = await Country.find().select({ countryName: 1, }).sort({ countryName: 1 });
  res.json(country);
};

// @desc    get country by id
// @route   GET /api/country/:id
// @access  public
const getCountryById = async (req, res) => {
  const country = await Country.findById(req.params.id);
  if (country) {
    res.json(country);
  } else {
    res.status(404);
    throw new Error("Country not found");
  }
};

// @desc    get country by name
// @route   GET /api/country/getbyname
// @access  public
const getCountryByName = async (req, res) => {
  const { countryname } = req.params;
  console.log(countryname);
  // const country = await Country.find({ countryName });
  // if (country) {
  //   res.json(country);
  // } else {
  //   res.status(404);
  //   throw new Error("Country not found");
  // }
};

// @desc    get country by category
// @route   GET /api/country/category/:category
// @access  public
const getCountryByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const country = await Country.find({ category });
    if (country.length > 0) {
      res.json(country);
    } else {
      res.status(404).json({ message: "Country not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    add country
// @route   POST /api/country/add
// @access  private
const addCountry = async (req, res) => {
  const {
    currency,
    timeZone,
    bestTimeToVisit,
    countryName,
    aboutCountry,
    idealDays,
    imageUrl,
    weather,
    onArrival,
    cost,
    bestPlaces,
    countryFlagImage,
    category,
  } = req.body;

  const country = await Country.create({
    general: {
      currency,
      timeZone,
      bestTimeToVisit,
    },
    countryName,
    aboutCountry,
    idealDays,
    imageUrl,
    weather,
    visa: {
      onArrival,
      cost,
    },
    bestPlaces,
    countryFlagImage,
    category,
  });
  await country.save();
  res.status(201).json(country);
};

// @desc    update country
// @route   POST /api/country/update/:id
// @access  private
const updateCountry = async (req, res) => {
  try {
    const {
      currency,
      timeZone,
      bestTimeToVisit,
      countryName,
      aboutCountry,
      idealDays,
      imageUrl,
      weather,
      onArrival,
      cost,
      bestPlaces,
      countryFlagImage,
      category,
    } = req.body;
    const country = await Country.findById(req.params.id);

    const bestTimeToVisitArray = country.general.bestTimeToVisit;
    bestTimeToVisitArray.push(bestTimeToVisit);

    country.general.currency = currency;
    country.general.timeZone = timeZone;
    country.general.bestTimeToVisit = bestTimeToVisitArray;
    country.countryName = countryName;
    country.aboutCountry = aboutCountry;
    country.idealDays = idealDays;
    country.imageUrl = imageUrl;
    country.weather = weather;
    country.visa.onArrival = onArrival;
    country.visa.cost = cost;
    country.bestPlaces = bestPlaces;
    country.countryFlagImage = countryFlagImage;
    country.category = category;

    await country.save();
    res.status(201).json(country);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    delete country
// @route   POST /api/country/delete
// @access  private
const deleteCountry = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedCity = await Country.findByIdAndDelete(id);
    res.status(200).json({ message: "Country deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCountry,
  getAllCountryAutocomplete,
  getCountryById,
  getCountryByName,
  addCountry,
  getCountryByCategory,
  updateCountry,
  deleteCountry,
};
