var mongoose = require('mongoose');

var lessonSchema = new mongoose.Schema({
  lessonName: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  activities: [ {_id: ObjectId, activityName: String, sourceCode: String} ],
  world: {
    type: String,
    required: true
  },
  script: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('lesson', lessonSchema);
