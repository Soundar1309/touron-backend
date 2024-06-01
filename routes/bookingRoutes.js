const express = require("express");
const router = express.Router();
const {
  addBooking,
  geAllBooking,
  getBookingbyID,
  updateBooking,
  updateAssignedTo,
  updateStatus,
} = require("../controllers/bookingControllers");

router.get("/", geAllBooking);
router.get("/:id", getBookingbyID);
router.post("/", addBooking);
router.post("/:id", updateBooking);
router.post("/assignedto/:id", updateAssignedTo);
router.post("/status/:id", updateStatus);

module.exports = router;
