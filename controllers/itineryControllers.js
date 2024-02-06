const Itinery = require("../models/itineryModel");
const ItineryDetails = require("../models/itineryDetailsModel");

// @desc    get itinery
// @route   GET /api/itinery/
// @access  public
const getItinery = async (req, res) => {
  const itinery = await Itinery.find({});
  res.json(itinery);
};

// @desc    get itinery
// @route   GET /api/itinery/getbyname
// @access  public
const getItineryByName = async (req, res) => {
  try {
    const { name } = req.query; // Use req.query instead of req.body
    const itinery = await Itinery.find({ category: name });
    res.json(itinery);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// @desc    get itinery
// @route   GET /api/itinery/getbycountry
// @access  public
const getItineryByCountry = async (req, res) => {
  try {
    const { country } = req.query;

    // Ensure that `ItineryDetails` and `Itinery` models are imported and defined.

    const itineryId = await ItineryDetails.find({ country });

    const itinery = await Itinery.find({ country: itineryId[0]._id });

    res.json(itinery);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// @desc    get itinery by id
// @route   GET /api/itinery/:id
// @access  public
const getItinerybyID = async (req, res) => {
  const itinery = await Itinery.findById(req.params.id);
  if (itinery) {
    res.json(itinery);
  } else {
    res.status(404);
    throw new Error("Itinery not found");
  }
};

// @desc    add itinery
// @route   POST /api/itinery/additinery
// @access  private
const addItinery = async (req, res) => {
  const {
    itineryTitle,
    country,
    cityname,
    noOfDays,
    days,
    priceRangeStart,
    priceRangeEnd,
    category,
  } = req.body;

  const itineryId = await ItineryDetails.find({ country });

  const itinery = await Itinery.create({
    itineryTitle,
    country: itineryId[0]._id,
    cityname,
    noOfDays,
    days,
    priceRangeStart,
    priceRangeEnd,
    category,
  });
  await itinery.save();
  res.status(201).json(itinery);
};

// @desc    update itinery
// @route   POST /api/itinery/updateItinery/:id
// @access  private
const updateItinery = async (req, res) => {
  try {
    const {
      itineryTitle,
      country,
      cityname,
      noOfDays,
      days,
      priceRangeStart,
      priceRangeEnd,
      category,
    } = req.body;
    const itineryId = await ItineryDetails.find({ country });

    const itinery = await Itinery.findById(req.params.id);
    itinery.itineryTitle = itineryTitle;
    itinery.country = itineryId[0]._id;
    itinery.cityname = cityname;
    itinery.noOfDays = noOfDays;
    itinery.days = days;
    itinery.priceRangeStart = priceRangeStart;
    itinery.priceRangeEnd = priceRangeEnd;
    itinery.category = category;
    await itinery.save();
    res.status(201).json(itinery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    delete itinery
// @route   POST /api/itinery/deleteitinery
// @access  private
const deleteItinery = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedItinery = await Itinery.findByIdAndDelete(id);
    res.status(200).json({ message: "Itinery deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getItinery,
  getItineryByName,
  getItineryByCountry,
  getItinerybyID,
  addItinery,
  updateItinery,
  deleteItinery,
};
