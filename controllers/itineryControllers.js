const Itinery = require("../models/itineryModel");
const ItineryDetails = require("../models/itineryDetailsModel");
const cloudinary = require("../config/cloudinary");

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
  try {
    const itinerary = await Itinery.findById(req.params.id);
    if (itinerary) {
      res.json(itinerary);
    } else {
      res.status(404).json({ message: "Itinerary not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    add itinery
// @route   POST /api/itinery/additinery
// @access  private
const addItinery = async (req, res) => {
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

    const imageResults = await Promise.all([
      cloudinary.uploader.upload(req.body.image1, { folder: "uploads" }),
      cloudinary.uploader.upload(req.body.image2, { folder: "uploads" }),
      cloudinary.uploader.upload(req.body.image3, { folder: "uploads" }),
      cloudinary.uploader.upload(req.body.image4, { folder: "uploads" }),
      cloudinary.uploader.upload(req.body.image5, { folder: "uploads" }),
    ]);

    const itineryId = await ItineryDetails.find({ country });

    if (itineryId && itineryId.length > 0) {
      const itinery = await Itinery.create({
        itineryTitle,
        country: itineryId[0]._id,
        cityname,
        noOfDays,
        days,
        priceRangeStart,
        priceRangeEnd,
        category,
        image1: {
          public_id: imageResults[0].public_id,
          url: imageResults[0].secure_url,
        },
        image2: {
          public_id: imageResults[1].public_id,
          url: imageResults[1].secure_url,
        },
        image3: {
          public_id: imageResults[2].public_id,
          url: imageResults[2].secure_url,
        },
        image4: {
          public_id: imageResults[3].public_id,
          url: imageResults[3].secure_url,
        },
        image5: {
          public_id: imageResults[4].public_id,
          url: imageResults[4].secure_url,
        },
      });
      await itinery.save();
      res.status(201).json(itinery);
    } else {
      res.status(404).json({ message: "Country not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
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
    if (req.body.image1) {
      const imageResult = await cloudinary.uploader.upload(req.body.image1, {
        folder: "uploads",
      });
      itinery.image1 = {
        public_id: imageResult.public_id,
        url: imageResult.secure_url,
      };
    } else {
      itinery.image1 = itinery.image1;
    }
    if (req.body.image2) {
      const imageResult = await cloudinary.uploader.upload(req.body.image2, {
        folder: "uploads",
      });
      itinery.image2 = {
        public_id: imageResult.public_id,
        url: imageResult.secure_url,
      };
    } else {
      itinery.image2 = itinery.image2;
    }
    if (req.body.image3) {
      const imageResult = await cloudinary.uploader.upload(req.body.image3, {
        folder: "uploads",
      });
      itinery.image3 = {
        public_id: imageResult.public_id,
        url: imageResult.secure_url,
      };
    } else {
      itinery.image3 = itinery.image3;
    }
    if (req.body.image4) {
      const imageResult = await cloudinary.uploader.upload(req.body.image4, {
        folder: "uploads",
      });
      itinery.image4 = {
        public_id: imageResult.public_id,
        url: imageResult.secure_url,
      };
    } else {
      itinery.image4 = itinery.image4;
    }
    if (req.body.image5) {
      const imageResult = await cloudinary.uploader.upload(req.body.image5, {
        folder: "uploads",
      });
      itinery.image5 = {
        public_id: imageResult.public_id,
        url: imageResult.secure_url,
      };
    } else {
      itinery.image5 = itinery.image5;
    }
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
