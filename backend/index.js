const express = require('express');

const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db'); // Import database connection

const app = express();
const PORT = 5000;

// Connect to Database
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bookings', require('./routes/bookingRoutes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});