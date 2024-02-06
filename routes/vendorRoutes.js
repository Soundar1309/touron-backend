const express = require("express")
const router = express.Router()
const { getVendorByAscending, getVendorbyID, addVendor, updateVendor, deleteVendor } = require("../controllers/vendorControllers")

router.get("/", getVendorByAscending)
router.get("/:id", getVendorbyID)
router.post("/addvendor", addVendor)
router.post("/updatevendor/:id", updateVendor)
router.post("/deletevendor", deleteVendor)

module.exports = router