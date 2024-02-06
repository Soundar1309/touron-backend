const express = require("express");
const router = express.Router();
const {
  getItineryDetails,
  getItineryDetailsByName,
  addItineryDetails,
  getItineryDetailsbyID,
  updateItineryDetails,
} = require("../controllers/itineryDetailsControllers");

router.get("/", getItineryDetails);
router.get("/getbyname", getItineryDetailsByName);
router.get("/:id", getItineryDetailsbyID);
router.post("/add", addItineryDetails);
router.post("/update/", updateItineryDetails);

module.exports = router;
