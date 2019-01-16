var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  instructor: {
      id: { type: String, required: true },
      name: { type: String, required: true },
  },
  belongTo: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true },
  state: { type: String, required: true },
  lessons: [{
    _id: { type: String, required: true },
    lessonName: { type: String, required: true },
  }],
  students: [{
    id : { type: String, required: true },
    name: { type: String, required: true },
    progress: { type: Number, default: 0 }
  }],
});

module.exports = mongoose.model('course', courseSchema);
