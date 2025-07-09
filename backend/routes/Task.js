import express from "express";
import Task from "../models/task.model.js";

const router = express.Router();

//Get all uniqes dates from tasks
router.get("/", async (req, res) => {
  try {
    const dates = await Task.distinct("date");
    res.json(dates);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch unique dates" });
  }
});

// Get all tasks for a specific date
router.get("/:date", async (req, res) => {
  try {
    const tasks = await Task.find({ date: req.params.date });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Create a new task
router.post("/", async (req, res) => {
  try {
    const { date, text } = req.body;
    const newTask = new Task({ date, text });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: "Failed to create task" });
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update task" });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete task" });
  }
});

export default router;
