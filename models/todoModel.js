const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    done: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Login",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todolist", todoSchema);
