const express = require("express");
const router = express.Router();
const {
  addBookTour,
  geAllBookTour,
  getBookTourbyID,
  updateBookTour
} = require("../controllers/bookTourControllers");

router.get("/", geAllBookTour);
router.get("/:id", getBookTourbyID);
router.post("/", addBookTour);
router.patch("/", updateBookTour);

module.exports = router;
