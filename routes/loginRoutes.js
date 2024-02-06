const express = require("express")
const router = express.Router()
const { getUser, getUserById, loginUser, deleteUser, sendOTP, verifyOTP,updateUserById } = require("../controllers/loginControllers")

router.get("/getuser", getUser)
router.get("/:id", getUserById)
router.post("/", loginUser)
router.post("/update/:id", updateUserById)
router.post("/send-otp", sendOTP)
router.post("/verify-otp", verifyOTP)
router.post("/delete", deleteUser)

module.exports = router