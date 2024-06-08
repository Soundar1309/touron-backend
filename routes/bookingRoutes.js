const express = require("express");
const router = express.Router();
const {
  addBooking,
  getAllBooking,
  getBookingbyID,
  updateBooking,
  updateAssignedTo,
  getStatusCountForUser,
  updateStatus,
} = require("../controllers/bookingControllers");

router.get("/", getAllBooking);
router.get("/:id", getBookingbyID);
router.post("/", addBooking);
router.post("/:id", updateBooking);
router.post("/assignedto/:id", updateAssignedTo);
router.get("/requeststatistics/:id", getStatusCountForUser);
router.post("/status/:id", updateStatus);

module.exports = router;
