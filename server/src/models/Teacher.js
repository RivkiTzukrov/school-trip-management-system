const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  id:        { type: String, required: true, unique: true, minlength: 9, maxlength: 9 },
  className: { type: String, required: true },
});

module.exports = mongoose.model('Teacher', teacherSchema);