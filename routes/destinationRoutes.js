const express = require("express");
const router = express.Router();
const {
  getAllCountriesWithCities,
  getAllStatesWithCities
} = require("../controllers/destinationControllers");

router.get("/international", getAllCountriesWithCities);

router.get("/domestic", getAllStatesWithCities);

module.exports = router;
