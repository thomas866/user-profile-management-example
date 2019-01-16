var mongoose = require('mongoose');

var inClassSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  instructor: {
    id: { type: String },
    username: { type: String, required: true }
  }
  ipAddress: { type: String, required: true },
  students: [{
    id: { type: String },
    username: { type: String, required: true }
  }],
});

module.exports = mongoose.model('inClass', inClassSchema);
