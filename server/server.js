const express = require('express');
const path = require("path")
const dotenv = require('dotenv');
const cors = require('cors');

// Config
dotenv.config();
const app = express();
const allowedOrigins = ['http://localhost:5173', 'http://172.236.98.211'];
app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., Postman)
      if (!origin) return callback(null, true);
  
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // If you are using cookies or credentials
  }));
app.use(express.json());
app.use((req, res, next) => {
    console.log('Request Body:', req.body);
    next();
});

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
