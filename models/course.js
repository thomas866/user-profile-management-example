var mongoose = require('mongoose');


var courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  instName: {
    type: String,
    required: true
  },
  belongTo: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  lessons: [{ _id: String, lessonName: String, author: String }],
  studens: [{ _id: String, username: String, progress: Number }],

});

module.exports = mongoose.model('course', courseSchema);
