const Task = require('../models/Task');
const sendNotification = require('../utils/sendNotification');

exports.createTask = async (req, res) => {
  try {
    const { title, subtasks, assignedTo, deadline, bgColor } = req.body;

    console.log('Request Body:', req.body); // Debug the incoming request

    const task = await Task.create({
      title,
      subtasks,
      assignedTo,
      deadline,
      bgColor, // Save the background color
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error); // Log the error
    res.status(500).json({ error: 'Failed to create task' });
  }
};

  
  

exports.getTasks = async (req, res) => {
    try {
      const tasks = await Task.find().populate('assignedTo', 'name email'); // Fetch user name and email
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching tasks' });
    }
  };

  exports.updateTask = async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(updatedTask);
    } catch (err) {
      res.status(400).json({ error: 'Error updating task' });
    }
  };

  exports.updateTaskStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true } // Return the updated task
      );
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.json(task);
    } catch (error) {
      res.status(400).json({ error: 'Error updating task status' });
    }
  };
  

  exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting task' });
  }
};

