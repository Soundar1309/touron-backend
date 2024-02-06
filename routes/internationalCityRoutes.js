const express = require("express")
const router = express.Router()
const { getCityByAscending, getCitybyID, addCity, updateCity, deleteCity, getCityByAscendingByCountry } = require("../controllers/internationalCityControllers")

router.get("/", getCityByAscending)
router.get("/country", getCityByAscendingByCountry)
router.get("/:id", getCitybyID)
router.post("/add", addCity)
router.post("/update/:id", updateCity)
router.post("/delete", deleteCity)

module.exports = router