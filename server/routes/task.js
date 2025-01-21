const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require('../controller/taskController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.put('/:id', authMiddleware, updateTask); // Update task
router.delete('/:id', authMiddleware, deleteTask); // Delete task
router.put('/:id', authMiddleware, updateTaskStatus);

module.exports = router;
