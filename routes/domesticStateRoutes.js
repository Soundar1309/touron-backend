const express = require("express")
const router = express.Router()
const { getStateByAscending, getStatebyID, addState, updateState, deleteState, getStateByAscendingInState } = require("../controllers/domesticStateControllers")

router.get("/", getStateByAscending)
router.get("/stateName", getStateByAscendingInState)
router.get("/:id", getStatebyID)
router.post("/add", addState)
router.post("/update/:id", updateState)
router.post("/delete", deleteState)

module.exports = router