const express = require("express");
const router = express.Router();
const {
  addBookTour,
  geAllBookTour,
  getBookTourbyID,
} = require("../controllers/bookTourControllers");

router.get("/", geAllBookTour);
router.get("/:id", getBookTourbyID);
router.post("/", addBookTour);

module.exports = router;
