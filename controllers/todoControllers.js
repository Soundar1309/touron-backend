const Todo = require("../models/todoModel");

// @desc    get all todo in ascending order  created today
// @route   GET /api/todo/today
// @access  public
const getTodoToday = async (req, res) => {
  try {
    const currentDate = new Date().toISOString().split("T")[0];

    const todos = await Todo.find({
      user: req.user._id,
      done: false,
      createdAt: {
        $gte: currentDate + "T00:00:00.000Z",
        $lt: currentDate + "T23:59:59.999Z",
      },
    }).sort({ createdAt: 1 });

    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    get all todo in ascending order remaining
// @route   GET /api/todo/remaining
// @access  public
const getTodoRemaining = async (req, res) => {
  try {
    const currentDate = new Date().toISOString().split("T")[0];

    const todos = await Todo.find({
      user: req.user._id,
      createdAt: { $lt: currentDate + "T00:00:00.000Z" },
      done: false,
    }).sort({ createdAt: 1 });

    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    get todo by done
// @route   GET /api/todo/done
// @access  public
const getTodoByDone = async (req, res) => {
  try {
    const currentDate = new Date().toISOString().split("T")[0];

    const todos = await Todo.find({
      user: req.user._id,
      done: true,
    }).sort({ createdAt: 1 });

    res.json(todos);
  } catch (error) {
    console.error(error);
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
  const { todo, date } = req.body;

  console.log(req.body);

  const todoItem = await Todo.create({
    todo,
    date,
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
    const { todo, date, done } = req.body;
    const todoItem = await Todo.findById(req.params.id);
    todoItem.todo = todo;
    todoItem.date = date;
    todoItem.done = done;
    await todoItem.save();
    res.status(201).json(todoItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    update todo complete
// @route   POST /api/todo/complete/:id
// @access  private
const updateCompleted = async (req, res) => {
  try {
    const { done } = req.body;
    const todoItem = await Todo.findById(req.params.id);
    todoItem.todo = todoItem.todo;
    todoItem.date = todoItem.date;
    todoItem.done = done;
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
    const { id } = req.body;
    const todoItem = await Todo.findByIdAndDelete(id);
    res.status(200).json("Todo deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getTodoToday,
  getTodoRemaining,
  getTodoByDone,
  getTodoByID,
  addTodo,
  updateCompleted,
  updateTodo,
  deleteTodo,
};
