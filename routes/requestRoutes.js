const express = require("express");
const router = express.Router();
const {
  getRequest,
  getRequestbyID,
  addRequest,
  updateRequest,
  deleteRequest,
  getRequestbySurveyId,
  getRequestByMobile,
  getRequestDetailByMobile,
  getUpcomingTrip,
  getCurrentTrip,
  getCancelledTrip,
  getCompletedTrip,
  getUpcomingTripByMobile,
  getCurrentTripbyMobile,
  getCancelledTripByMobile,
  getCompletedTripByMobile,
} = require("../controllers/requestControllers");
const { protect } = require("../middlewares/authMiddlewares");

router.get("/", getRequest);
router.get("/upcomingtrips", getUpcomingTrip);
router.get("/currenttrips", getCurrentTrip);
router.get("/cancelledtrips", getCancelledTrip);
router.get("/completedtrips", getCompletedTrip);
router.get("/upcomingtrips/mobile", getUpcomingTripByMobile);
router.get("/currenttrips/mobile", getCurrentTripbyMobile);
router.get("/cancelledtrips/mobile", getCancelledTripByMobile);
router.get("/completedtrips/mobile", getCompletedTripByMobile);
router.get("/surveyid/:id", getRequestbySurveyId);
router.get("/mobile", getRequestByMobile);
router.get("/mobile/getdetails", getRequestDetailByMobile);
router.get("/:id", getRequestbyID);
router.post("/add", protect, addRequest);
router.post("/update", updateRequest);
router.post("/delete", deleteRequest);

module.exports = router;
