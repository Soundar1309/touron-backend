const BookingB2B = require("../models/bookingb2bModel");


// @desc    get bookingb2b
// @route   GET /api/bookingb2b/
// @access  public
const getBookingb2b = async (req, res) => {
  const bookingb2b = await BookingB2B.find({});
  res.json(bookingb2b);
};

// @desc    get bookingb2b by mobile
// @route   GET /api/bookingb2b/mobile
// @access  public
const getBookingB2BByMobile = async (req, res) => {
  const { mobileNumber } = req.query;
  const bookingB2C = await BookingB2B.find({ mobileNumber });
  res.json(bookingB2C);
};

module.exports = {
    getBookingb2b,
    getBookingB2BByMobile
}