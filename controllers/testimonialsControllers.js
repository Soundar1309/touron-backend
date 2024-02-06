const Testimonials = require("../models/testimonialsModel");
const cloudinary = require("../config/cloudinary");

// @desc    get testimonials
// @route   GET /api/testimonials/
// @access  private
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonials.find({}).sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    get testimonials by id
// @route   GET /api/testimonials/:id
// @access  private
const getTestimonialsById = async (req, res) => {
  try {
    const testimonials = await Testimonials.findById(req.params.id);
    res.status(200).json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    add testimonials
// @route   POST /api/testimonials/add
// @access  private
const addTestimonials = async (req, res) => {
  try {
    const { name, comment, tourPlace, field } = req.body;
    const imageResult = await cloudinary.uploader.upload(req.body.image, {
      folder: "uploads",
    });
    const testimonials = new Testimonials({
      name,
      comment,
      tourPlace,
      field,
      image: {
        public_id: imageResult.public_id,
        url: imageResult.secure_url,
      },
    });
    await testimonials.save();
    res.status(201).json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    update testimonials
// @route   POST /api/testimonials/update/:id
// @access  private
const updateTestimonials = async (req, res) => {
  try {
    const { name, comment, tourPlace, field } = req.body;
    const testimonials = await Testimonials.findById(req.params.id);
    testimonials.name = name;
    testimonials.comment = comment;
    testimonials.tourPlace = tourPlace;
    testimonials.field = field;
    if (req.body.image) {
      const imageResult = await cloudinary.uploader.upload(req.body.image, {
        folder: "uploads",
      });
      testimonials.image = {
        public_id: imageResult.public_id,
        url: imageResult.secure_url,
      };
    } else {
      testimonials.image = testimonials.image;
    }
    await testimonials.save();
    res.status(201).json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    delete testimonials
// @route   POST /api/testimonials/delete
// @access  private
const deleteTestimonials = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedtestimonials = await Testimonials.findByIdAndDelete(id);
    res.status(200).json({ message: "Testimonials deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTestimonials,
  getTestimonialsById,
  addTestimonials,
  updateTestimonials,
  deleteTestimonials,
};
