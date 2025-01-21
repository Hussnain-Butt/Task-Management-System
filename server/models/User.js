const mongoose = require('mongoose');
const Task = require('./Task'); // Import the Task model

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

// Middleware to delete tasks associated with the user
UserSchema.pre('remove', async function (next) {
  try {
    // Delete tasks assigned to this user
    await Task.deleteMany({ assignedTo: this._id });
    console.log(`Tasks assigned to user ${this._id} have been deleted.`);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('User', UserSchema);
