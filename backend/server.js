// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// --- Database Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};
connectDB();

// --- API Routes ---
app.get('/', (req, res) => {
    res.send('NutriSync API is running...');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/food', require('./routes/food'));


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

