const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  userId: String, // You may want to add user authentication later
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Location', LocationSchema);