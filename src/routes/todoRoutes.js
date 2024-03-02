const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.findById();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a todo
router.post("/", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    completed: req.body.completed,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a todo
router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (req.body.title) todo.title = req.body.title;
    if (req.body.completed !== undefined) todo.completed = req.body.completed;
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.deleteOne();
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
