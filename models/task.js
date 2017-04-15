var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  title: {type: String, required: true},
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Task', TaskSchema);
