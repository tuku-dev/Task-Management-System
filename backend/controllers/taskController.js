const Task = require("../models/taskModel");

exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
};

exports.createTask = async (req, res) => {
  const body = req.body;
  if (!body.title) {
    return res.status(400).json({ error: "Title is required" });
  }
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  if (!body.title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ task });
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, { deleted: true });
  res.status(200).json({ message: "Task marked as deleted", task });
};