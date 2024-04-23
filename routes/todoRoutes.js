const express = require("express");
const router = express.Router();
const {
  getAllTodo,
  getTodoByID,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoControllers");
const { protect } = require("../middlewares/authMiddlewares");

router.get("/", protect, getAllTodo);
router.get("/:id", protect, getTodoByID);
router.post("/", protect, addTodo);
router.post("/:id", protect, updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
