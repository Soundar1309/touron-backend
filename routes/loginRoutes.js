const express = require("express");
const router = express.Router();
const {
  getUser,
  getUserById,
  loginUser,
  deleteUser,
  verifyToken,
  updateUserById,
} = require("../controllers/loginControllers");

router.get("/getuser", getUser);
router.get("/:id", getUserById);
router.post("/", loginUser);
router.post("/update/:id", updateUserById);
router.post("/verify-token", verifyToken);
router.post("/delete", deleteUser);

module.exports = router;
