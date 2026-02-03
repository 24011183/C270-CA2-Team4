const express = require("express");
const app = express();
app.use(express.json());

// for the frontend files
app.use(express.static("public"));

// "database"
let todos = [];


// CREATE
app.post("/todos", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const newTodo = {
    id: todos.length + 1,
    title,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// READ
app.get("/todos", (req, res) => {
  res.json(todos);
});

// UPDATE
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((item) => item.id === id);

  if (!todo) return res.status(404).json({ error: "To-do not found" });

  todo.completed = !todo.completed;
  res.json(todo);
});

// DELETE
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((item) => item.id !== id);
  res.status(204).send();
});

// Export for testing and server.js
module.exports = app;