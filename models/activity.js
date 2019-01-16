var mongoose = require('mongoose');

var activitySchema = new mongoose.Schema({
  activityName: { type: String, required: true },
  sourceCode: { type: String }
});

module.exports = mongoose.model('activity', activitySchema);
