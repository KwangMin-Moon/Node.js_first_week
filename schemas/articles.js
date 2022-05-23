const mongoose = require('mongoose');

const articlesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: Number,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Article', articlesSchema);
