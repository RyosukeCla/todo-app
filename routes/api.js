var express = require('express');
var router = express.Router();

// ------  DB  -------
const MONGO_URI = process.env.MONGODB_URI || 'localhost';
var mongoose = require('mongoose');
var db = mongoose.connect(`mongodb://${MONGO_URI}`);
var Todo = require('../models/todo');
var Task = require('../models/task');

/* API */
router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'Successfully Posted a test message.' });
});

// Task

router.route('/task').post(
  function(req, res) {
    var task = new Task();
    task.title = req.body.title;

    task.save(function(err, task) {
      if (err) res.send(err);
      res.json({task_id: task._id});
    });
  }
).get(
  function(req, res) {
    Task.find(function(err, task) {
      if (err) res.send(err);

      res.json(task);
    });
  }
);

router.route('/task/:task_id').put(
  function(req, res) {
    Task.findById(req.params.task_id, function(err, task) {
      if (err) res.send(err);
      task.title = req.body.title;
      task.updated = Date.now();

      task.save(function(err) {
        if (err) res.send(err);
        res.json({message: 'Task updated!'});
      });
    });
  }
).delete(
  function(req, res) {
    Task.remove({
      _id: req.params.task_id
    }, function(err, task) {
      if (err) res.send(err);
      Todo.remove({
        task_id: req.params.task_id
      }, function(err, todo) {
        if (err) {
          rollback(task);
          res.send(err);
        }
        res.json({message: 'Successfully deleted!'});
      });
    });
  }
);

// Todo
router.route('/todo').post(
  function(req, res) {
    var todo = new Todo();
    todo.task_id = req.body.task_id;
    todo.title = req.body.title;

    todo.save(function(err, todo) {
      if (err) res.send(err);
      res.json({todo_id: todo._id});
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

router.route('/todo/from_task/:task_id').get(
  function(req, res) {
    Todo.find({task_id: req.params.task_id}, function(err, todo) {
      if (err) res.send(err);
      res.json(todo);
    });
  }
);

router.route('/todo/single/:todo_id').put(
  function(req, res) {
    Todo.findById(req.params.todo_id, function(err, todo) {
      if (err) res.send(err);
      todo.has_done = req.body.has_done;
      todo.updated = Date.now();

      todo.save(function(err) {
        if (err) res.send(err);
        res.json({message: 'Todo updated!'});
      });
    });
  }
).delete(
  function(req, res) {
    Todo.remove({
      _id: req.params.todo_id
    }, function(err, todo) {
      if (err) res.send(err);
      res.json({message: 'Successfully deleted!'});
    });
  }
);


module.exports = router;
