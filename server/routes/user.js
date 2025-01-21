const express = require('express');
const { getAllUsers } = require('../controller/userController');
const { getMe } = require('../controller/authController');

const authMiddleware = require('../middlewares/auth');
const router = express.Router();
router.get('/users', authMiddleware, getAllUsers)
router.get('/me', authMiddleware, getMe)




module.exports = router;
