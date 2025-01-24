const express = require('express');
const path = require("path")
const dotenv = require('dotenv');
const cors = require('cors');

// Config
dotenv.config();
const app = express();
app.use(cors({
    origin: 'http://172.236.98.211'
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
// Database Connection
const connectDB = require('./config/db');
connectDB();
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
// Routes
app.use('/api/auth', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/task'));

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
