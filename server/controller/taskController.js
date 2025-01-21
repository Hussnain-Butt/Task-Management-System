const Task = require('../models/Task');
const sendNotification = require('../utils/sendNotification');

exports.createTask = async (req, res) => {
  try {
    const { title, subtasks, assignedTo, deadline, bgColor } = req.body;

    if (!assignedTo) {
      return res.status(400).json({ error: 'Assigned user is required' });
    }

    const task = await Task.create({
      title,
      subtasks,
      assignedTo,
      deadline,
      bgColor,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    // Ensure only admins can access this
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Fetch all tasks with user details
    const tasks = await Task.find()
      .populate('assignedTo', 'name email') // Populate user details (name and email)
      .exec();

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};
  
exports.getTasks = async (req, res) => {
  try {
    const user = req.user;
    let tasks;

    if (user.role === 'admin') {
      tasks = await Task.find().populate('assignedTo', 'name email'); // Populate assigned user details
    } else {
      tasks = await Task.find({ assignedTo: user._id }).populate('assignedTo', 'name email');
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ error: 'Failed to fetch tasks' });
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

