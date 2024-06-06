const ItineryDetails = require("../models/ItineraryModal");
const cloudinary = require("../config/cloudinary");

// @desc    get itinerydetails
// @route   GET /api/itinerary/
// @access  public
const getItineraries = async (req, res) => {
  const itinery = await ItineryDetails.find().select({
    country: 1,
    stateName: 1,
    title: 1,
    price: 1,
    destination: 1,
    duration: 1,
    hotel: 1,
    meals: 1,
    image: 1,
    description: 1,
    topHighlights: 1,
    tourType: 1,
    topHighlights: 1,
  });
  res.json(itinery);
};

// @desc    get itinerydetails by id
// @route   GET /api/itinerary/:id
// @access  public
const getItinerary = async (req, res) => {
  const itinery = await ItineryDetails.findById(req.params.id);
  if (itinery) {
    res.json(itinery);
  } else {
    res.status(404);
    throw new Error("Itinery not found");
  }
};

// @desc    delete itinerydetails by id
// @route   DELETE /api/itinerary/:id
// @access  public
const deleteItinerary = async (req, res) => {
  try {
    await ItineryDetails.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Itinerary deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    add itinerydetails
// @route   GET /api/itinerary/add
// @access  private
const addItinerary = async (req, res) => {
  try {
    const {
      country,
      stateName,
      title,
      price,
      destination,
      duration,
      hotel,
      meals,
      tourType,
      image,
      description,
      topHighlights,
      tourPlanDescription,
      included,
      excluded,
      days,
    } = req.body;

    const imageResult = await cloudinary.uploader.upload(image, {
      folder: "itineraries",
    });

    const itinery = await ItineryDetails.create({
      country,
      stateName,
      title,
      price,
      destination,
      duration,
      hotel,
      tourType,
      meals,
      image: {
        public_id: imageResult.public_id,
        url: imageResult.secure_url,
      },
      description,
      topHighlights,
      tourPlanDescription,
      included,
      excluded,
      days,
    });
    await itinery.save();
    res.status(201).json({ ...itinery._doc, message: "Created Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    update itinerydetails
// @route   PATCH /api/itinerary/:id
// @access  private
const updateItinerary = async (req, res) => {
  try {
    const {
      country,
      stateName,
      title,
      price,
      destination,
      duration,
      hotel,
      meals,
      image,
      description,
      topHighlights,
      tourPlanDescription,
      included,
      excluded,
      tourType,
      days,
    } = req.body;

    let imageData;
    if (typeof image === "string") {
      const imageResult = await cloudinary.uploader.upload(image, {
        folder: "itineraries",
      });
      imageData = {
        public_id: imageResult.public_id,
        url: imageResult.secure_url,
      };
    } else {
      imageData = image;
    }

    const itinerary = await ItineryDetails.findByIdAndUpdate(
      req.params.id,
      {
        country,
        stateName,
        title,
        price,
        destination,
        duration,
        hotel,
        meals,
        tourType,
        image: imageData,
        description,
        topHighlights,
        tourPlanDescription,
        included,
        excluded,
        days,
      },
      { new: true }
    );
    await itinerary.save();
    res
      .status(200)
      .json({ ...itinerary._doc, message: "Updated Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    update faq
// @route   PATCH /api/itinerary/:id/faq
// @access  private
const updateItineraryFaq = async (req, res) => {
  try {
    const { faq } = req.body;
    const itinerary = await ItineryDetails.findByIdAndUpdate(
      req.params.id,
      { faq },
      { new: true }
    );
    await itinerary.save();
    res
      .status(200)
      .json({ ...itinerary._doc, message: "Updated Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    update review
// @route   PATCH /api/itinerary/:id/review
// @access  private
const updateItineraryReview = async (req, res) => {
  try {
    const { review } = req.body;
    const itinerary = await ItineryDetails.findByIdAndUpdate(
      req.params.id,
      { review },
      { new: true }
    );
    await itinerary.save();
    res
      .status(200)
      .json({ ...itinerary._doc, message: "Updated Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getItineraries,
  getItinerary,
  deleteItinerary,
  addItinerary,
  updateItinerary,
  updateItineraryReview,
  updateItineraryFaq,
};
