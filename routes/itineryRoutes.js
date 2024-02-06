const express = require("express")
const router = express.Router()
const { getItinery, getItineryByName, getItineryByCountry, addItinery, getItinerybyID, updateItinery, deleteItinery } = require("../controllers/itineryControllers")

router.get("/", getItinery)
router.get("/getbyname", getItineryByName)
router.get("/getbycountry", getItineryByCountry)
router.get("/:id", getItinerybyID)
router.post("/additinery", addItinery)
router.post("/updateitinery/:id", updateItinery)
router.post("/deleteitinery", deleteItinery)

module.exports = router