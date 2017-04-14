var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: false},
  has_done: {type: Boolean, default: false},
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Todo', TodoSchema);
