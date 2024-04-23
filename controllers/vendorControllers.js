const Vendor = require("../models/vendorModel");

// @desc    get all vendor in ascending order
// @route   GET /api/vendor/
// @access  public
const getVendorByAscending = async (req, res) => {
  const vendor = await Vendor.find({}).sort({ createdAt: -1 });
  res.json(vendor);
};

// @desc    get vendor by id
// @route   GET /api/vendor/:id
// @access  public
const getVendorbyID = async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  if (vendor) {
    res.json(vendor);
  } else {
    res.status(404);
    throw new Error("vendor not found");
  }
};

// @desc    add vendor
// @route   POST /api/vendor/addvendor
// @access  private
const addVendor = async (req, res) => {
  const { name } = req.body;

  const vendor = await Vendor.create({
    name,
  });
  await vendor.save();
  res.status(201).json(vendor);
};

// @desc    update vendor
// @route   POST /api/vendor/updatevendor/:id
// @access  private
const updateVendor = async (req, res) => {
  try {
    const {
      name
    } = req.body;
    const vendor = await Vendor.findById(req.params.id);
    vendor.name = name
    await vendor.save();
    res.status(201).json(vendor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    delete vendor
// @route   POST /api/vendor/deletevendor
// @access  private
const deleteVendor = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(id);
    res.status(200).json({ message: "vendor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getVendorByAscending,
  getVendorbyID,
  addVendor,
  updateVendor,
  deleteVendor
};
