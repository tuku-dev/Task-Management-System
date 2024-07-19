const Task = require("../models/Tasks")

exports.getTasks = async (req, res) => {
  const { _id, status, title } = req.body;
  const filter = {};

  if (_id) filter._id = _id;
  if (status) filter.status = status;
  if (title) filter.title = { $regex: title, $options: "i" }; // case-insensitive search

  filter.deleted = { $ne: true }; // Exclude deleted tasks

  try {
    const tasks = await Task.find(filter);
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  try {
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  try {
    const task = await Task.findByIdAndUpdate(id, { title, description }, { new: true });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(id, { deleted: true }, { new: true });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task marked as deleted", task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};