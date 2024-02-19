const express = require("express");
const router = express.Router();
const {
  getTodoToday,
  getTodoRemaining,
  getTodoByDone,
  getTodoByID,
  addTodo,
  updateCompleted,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoControllers");
const { protect } = require("../middlewares/authMiddlewares");

router.get("/today", protect, getTodoToday);
router.get("/remaining", protect, getTodoRemaining);
router.get("/done", protect, getTodoByDone);
router.get("/:id", protect, getTodoByID);
router.post("/add", protect, addTodo);
router.post("/complete/:id", protect, updateCompleted);
router.post("/update/:id", protect, updateTodo);
router.post("/delete", deleteTodo);

module.exports = router;
