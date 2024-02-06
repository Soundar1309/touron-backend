const BookingB2C = require("../models/bookingb2cModel");


// @desc    get bookingb2c
// @route   GET /api/bookingb2c/
// @access  public
const getBookingb2c = async (req, res) => {
  const bookingb2c = await BookingB2C.find({});
  res.json(bookingb2c);
};

// @desc    get bookingb2c by mobile
// @route   GET /api/bookingb2c/mobile
// @access  public
const getBookingB2CByMobile = async (req, res) => {
  const { mobileNumber } = req.query;
  const bookingB2C = await BookingB2C.find({ mobileNumber });
  res.json(bookingB2C);
};

module.exports = {
    getBookingb2c,
    getBookingB2CByMobile
}