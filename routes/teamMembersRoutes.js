const express = require("express")
const router = express.Router()
const { getTeamMembers, getTeamById, addTeam, updateTeam, deleteTeam } = require("../controllers/teamMembersControllers")

router.get("/", getTeamMembers)
router.get("/:id", getTeamById)
router.post("/add", addTeam)
router.post("/update/:id", updateTeam)
router.post("/delete", deleteTeam)

module.exports = router