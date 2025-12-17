const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },       // Added this!
  service: { type: String, required: true },     // Renamed from serviceType to match your frontend
  date: { type: String, required: true },
  location: { type: String, required: true },    // Added this!
  details: { type: String },                     // Renamed from message
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);