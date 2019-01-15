var mongoose = require('mongoose');

var activitySchema = new mongoose.Schema({
  activityName: {
    type: String,
    required: true
  },
  sourcecode: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('activity', activitySchema);
