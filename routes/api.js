var express = require('express');
var router = express.Router();

// ------  DB  -------
// const MONGO_URL = process.env.MONGODB_URL || ;
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/todoAppJsonAPI');
var Todo = require('../models/todo');

/* API */

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Successfully Posted a test message.' });
});

router.route('/todo').post(
  function(req, res) {
    var todo = new Todo();

    todo.title = req.body.title;
    todo.content = req.body.content;

    todo.save(function(err) {
      if (err) res.send(err);
      res.json({message: 'Todo created!'});
    });
  }
).get(
  function(req, res) {
    Todo.find(function(err, todo) {
      if (err) res.send(err);
      res.json(todo);
    });
  }
);

module.exports = router;
