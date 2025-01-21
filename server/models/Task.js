const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtasks: [
      {
        name: { type: String, required: true },
        status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
      },
    ],
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deadline: { type: Date },
    bgColor: { type: String, default: '#F9F9C5' }, // Ensure this field is defined
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);
