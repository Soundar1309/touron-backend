const express = require("express");
const router = express.Router();
const {
  getParticularByAscending,
  getParticularbyID,
  addParticular,
  updateParticular,
  deleteParticular,
} = require("../controllers/particularControllers");

router.get("/", getParticularByAscending);
router.get("/:id", getParticularbyID);
router.post("/addparticular", addParticular);
router.post("/updateparticular/:id", updateParticular);
router.post("/deleteparticular", deleteParticular);

module.exports = router;
