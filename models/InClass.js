var mongoose = require('mongoose');

var inClassSchema = new mongoose.Schema({
  courseName: String,
  courseID: String,
  instName: String,
  ipAddress: {
    type: String,
    required: true
  },
  students: [ { _id: ObjectId, username: String } ],
});

module.exports = mongoose.model('inClass', inClassSchema);
