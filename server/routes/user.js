const express = require('express');
const { getAllUsers } = require('../controller/userController');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
router.get('/users', authMiddleware, getAllUsers);



module.exports = router;
