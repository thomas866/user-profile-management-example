var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  category: { type: String, required: true },
  postName: { type: String, required: true },
  author: {
      id: { type: String, required: true },
      name: { type: String, required: true },
  },
  contents: { type: String, required: true },
  comments: [{
      id: { type: String, required: true },
      name: { type: String, required: true },
      contents: { type: String, required: true },
      date: { type: Date, required: true },
  }],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('post', postSchema);
