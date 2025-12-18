const express = require('express');

const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db'); // Import database connection

const PORT = process.env.PORT || 5000;
const app = express();

// Connect to Database
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bookings', require('./routes/bookingRoutes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

// ... existing code ...

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`port is perfect running on port ${PORT}`);
});
// ADD THIS LINE AT THE VERY END:
module.exports = app;
