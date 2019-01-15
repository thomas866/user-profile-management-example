var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  category: String,
  postName: {
    type: String,
    required: true,
  },
  author: String,
  comments: [{username: String,
              contents: {
                  type: String,
                  required: true,
              },
              date: Date.now}],
  date: Date.now
});

module.exports = mongoose.model('post', postSchema);
