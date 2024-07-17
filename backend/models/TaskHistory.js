const mongoose = require('mongoose');

const taskHistorySchema = new mongoose.Schema({
  taskId: { type: mongoose.Types.ObjectId, req: 'Task', required: true },
  title: { type: String, required: true },
  status: { type: String, enum: ["To Do", "In Progress", "Done"], required: true },
  description: { type: String, default: '' },
  deleted: { type: Boolean, default: false },
  editedAt: { type: Date, default: Date.now }
})

const TaskHistory = mongoose.model('TaskHistory', taskHistorySchema)

module.exports = TaskHistory