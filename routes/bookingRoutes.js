const express = require("express");
const router = express.Router();
const {
  addBooking,
  geAllBooking,
  getBookingbyID,
  updateBooking,
} = require("../controllers/bookingControllers");

router.get("/", geAllBooking);
router.get("/:id", getBookingbyID);
router.post("/", addBooking);
router.post("/:id", updateBooking);

module.exports = router;
