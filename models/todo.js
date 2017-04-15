var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  task_id: {type: String, required: true},
  title: {type: String, required: true},
  has_done: {type: Boolean, default: false},
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Todo', TodoSchema);
