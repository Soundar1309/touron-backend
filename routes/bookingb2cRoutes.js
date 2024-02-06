const express = require("express");
const router = express.Router();
const { getBookingb2c, getBookingB2CByMobile } = require("../controllers/bookingb2cControllers");

router.get("/", getBookingb2c);
router.get("/mobile", getBookingB2CByMobile);

module.exports = router;
