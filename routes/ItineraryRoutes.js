const express = require("express");
const router = express.Router();
const {
  getItineraries,
  getItinerary,
  deleteItinerary,
  addItinerary,
  updateItinerary,
  updateItineraryFaq,
  updateItineraryReview,
} = require("../controllers/ItineraryControllers");

router.get("/", getItineraries);
router.post("/", addItinerary);
router.get("/:id", getItinerary);
router.delete("/:id", deleteItinerary);
router.patch("/:id", updateItinerary);
router.patch("/:id/faq", updateItineraryFaq);
router.patch("/:id/review", updateItineraryReview);

module.exports = router;
