const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtasks: [
    {
      name: { type: String, required: true },
      status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    },
  ],
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ensure assignedTo is required
  deadline: { type: Date },
  bgColor: { type: String, default: '#F9F9C5' },
});

module.exports = mongoose.model('Task', TaskSchema);
