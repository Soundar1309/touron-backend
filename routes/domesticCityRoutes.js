const express = require("express")
const router = express.Router()
const { getCityByAscending, getCitybyID, addCity, updateCity, deleteCity, getCityByAscendingByCity, getCityByAscendingByState } = require("../controllers/domesticCityControllers")

router.get("/", getCityByAscending)
router.get("/city", getCityByAscendingByCity)
router.get("/state", getCityByAscendingByState)
router.get("/:id", getCitybyID)
router.post("/add", addCity)
router.post("/update/:id", updateCity)
router.post("/delete", deleteCity)

module.exports = router