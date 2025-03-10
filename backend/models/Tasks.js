const mongoose = require('mongoose');
const TaskHistory = require('./TaskHistory')

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ["todo", "progress", "done"], default: 'todo' },
  description: { type: String, default: '' },
  deleted: { type: Boolean, default: false }
})

taskSchema.pre('save', async function (next) {
  if (!this.isNew) {
    const taskHistory = new TaskHistory({
      taskId: this._id,
      title: this.title,
      status: this.status,
      description: this.description,
      deleted: this.deleted,
      editedAt: new Date()
    });
    await taskHistory.save();
  }
  next();
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;