const express = require("express");
const router = express.Router();
const { getBookingb2b, getBookingB2BByMobile } = require("../controllers/bookingb2bControllers");

router.get("/", getBookingb2b);
router.get("/mobile", getBookingB2BByMobile);

module.exports = router;
