const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  lat:       { type: Number, required: true },
  lng:       { type: Number, required: true },
  time:      { type: Date,   required: true },
});

module.exports = mongoose.model('Location', locationSchema);