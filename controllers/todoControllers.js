const Todo = require("../models/todoModel");

// @desc    get all todo
// @route   GET /api/todo
// @access  public
const getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user?._id, }).sort({ createdAt: -1 });

    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    get todo by id
// @route   GET /api/todo/:id
// @access  public
const getTodoByID = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404);
    throw new Error("vendor not found");
  }
};

// @desc    add todo
// @route   POST /api/todo/add
// @access  private
const addTodo = async (req, res) => {
  const { todo, status, dueDate } = req.body;
  console.log(todo, status, dueDate);
  const todoItem = await Todo.create({
    todo,
    dueDate,
    status: status || "Pending",
    user: req.user._id,
  });
  await todoItem.save();
  res.status(201).json(todoItem);
};

// @desc    update todo
// @route   POST /api/todo/update/:id
// @access  private
const updateTodo = async (req, res) => {
  try {
    const { todo, dueDate, status } = req.body;
    const todoItem = await Todo.findById(req.params.id);
    todoItem.todo = todo;
    todoItem.dueDate = dueDate;
    todoItem.status = status;
    await todoItem.save();
    res.status(201).json(todoItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    delete todo
// @route   POST /api/todo/delete
// @access  private
const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todoItem = await Todo.findByIdAndDelete(id);
    res.status(200).json("Todo deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getAllTodo,
  getTodoByID,
  addTodo,
  updateTodo,
  deleteTodo,
};
