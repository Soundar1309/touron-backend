const ItineryDetails = require("../models/itineryDetailsModel");

// @desc    get itinerydetails
// @route   GET /api/itinerydetails/
// @access  public
const getItineryDetails = async (req, res) => {
  const itinery = await ItineryDetails.find({});
  res.json(itinery);
};

// @desc    get itinery details by name
// @route   GET /api/itinerydetails/getbyname
// @access  public
const getItineryDetailsByName = async (req, res) => {
  try {
    const { country } = req.query;
    if (!country) {
      return res.status(400).json({ message: "Country name is required" });
    }

    const itinery = await ItineryDetails.find({ country });
    res.json(itinery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    get itinerydetails by id
// @route   GET /api/itinerydetails/:id
// @access  public
const getItineryDetailsbyID = async (req, res) => {
  const itinery = await ItineryDetails.findById(req.params.id);
  if (itinery) {
    res.json(itinery);
  } else {
    res.status(404);
    throw new Error("Itinery not found");
  }
};

// @desc    add itinerydetails
// @route   GET /api/itinerydetails/add
// @access  private
const addItineryDetails = async (req, res) => {
  const { country, overview, inclusion, weather, review, faq } = req.body;
  const itinery = await ItineryDetails.create({
    country,
    overview,
    inclusion,
    weather,
    review,
    faq,
  });
  await itinery.save();
  res.status(201).json(itinery);
};

// @desc    update itinerydetails
// @route   POST /api/itinerydetails/update/
// @access  private
const updateItineryDetails = async (req, res) => {
  try {
    const { country, overview, inclusion,weather, review, faq } = req.body;
    const itinery = await ItineryDetails.findOneAndUpdate({ country });
    itinery.country = country;
    itinery.overview = overview;
    itinery.inclusion = inclusion;
    itinery.weather = weather;
    itinery.review = review;
    itinery.faq = faq;
    await itinery.save();
    res.status(201).json(itinery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getItineryDetails,
  getItineryDetailsByName,
  getItineryDetailsbyID,
  addItineryDetails,
  updateItineryDetails,
};
