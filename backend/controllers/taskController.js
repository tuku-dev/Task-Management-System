const Task = require("../models/Tasks");

const sendResponse = (res, status, message, data = {}) => {
  const success = status >= 200 && status < 300;
  res.status(status).json({ success, ...message, ...data });
};

exports.getTasks = async (req, res) => {
  const { _id, status, title } = req.body;
  const filter = {};

  if (_id) filter._id = _id;
  if (status) filter.status = status;
  if (title) filter.title = { $regex: title, $options: "i" }; // case-insensitive search

  filter.deleted = { $ne: true }; // Exclude deleted tasks

  try {
    const totalCount = await Task.countDocuments(filter);
    const tasks = await Task.find(filter);
    sendResponse(res, 200, { message: "Tasks retrieved successfully" }, { tasks, totalCount });
  } catch (error) {
    sendResponse(res, 500, { error: error.message });
  }
};

exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;
  if (!title) {
    return sendResponse(res, 400, { error: "Title is required" });
  }
  try {
    const task = new Task({ title, description, status });
    await task.save();
    sendResponse(res, 201, { message: "Task created successfully" }, { task });
  } catch (error) {
    sendResponse(res, 400, { error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { _id, title, description, status } = req.body;
  if (!_id) {
    return sendResponse(res, 400, { error: "Id is required" });
  }
  if (!title) {
    return sendResponse(res, 400, { error: "Title is required" });
  }
  try {
    const task = await Task.findByIdAndUpdate(_id, { title, description, status }, { new: true });
    if (!task) {
      return sendResponse(res, 404, { error: "Task not found" });
    }
    sendResponse(res, 200, { message: "Task updated successfully" }, { task });
  } catch (error) {
    sendResponse(res, 400, { error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(id, { deleted: true }, { new: true });
    if (!task) {
      return sendResponse(res, 404, { error: "Task not found" });
    }
    sendResponse(res, 200, { message: "Task marked as deleted" }, { task });
  } catch (error) {
    sendResponse(res, 400, { error: error.message });
  }
};