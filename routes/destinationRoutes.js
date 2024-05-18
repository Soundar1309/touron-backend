const express = require("express");
const router = express.Router();
const {
  getAllCountriesWithCities,
} = require("../controllers/destinationControllers");

router.get("/", getAllCountriesWithCities);

module.exports = router;
