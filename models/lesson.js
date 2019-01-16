var mongoose = require('mongoose');

var lessonSchema = new mongoose.Schema({
  lessonName: { type: String, required: true },
  author: {
      id: { type: String, required: true },
      name: { type: String, required: true },
  },
  activities: [{
    activityName: { type: String, required: true },
    sourceCode: { type: String },
  }],
  script: { type: String },
  world: { type: String },
  note: { type: String },
});

module.exports = mongoose.model('lesson', lessonSchema);
