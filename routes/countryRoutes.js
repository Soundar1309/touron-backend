const express = require("express")
const router = express.Router()
const { getAllCountry, getCountryById, addCountry, updateCountry, deleteCountry, getCountryByName, getCountryByCategory } = require("../controllers/countryControllers")

router.get("/", getAllCountry)
router.get("/category/:category", getCountryByCategory);
router.get("/:id", getCountryById)
router.get("/getbyname/:countryname", getCountryByName)
router.post("/add", addCountry)
router.post("/update/:id", updateCountry)
router.post("/delete", deleteCountry)

module.exports = router