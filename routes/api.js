var express = require('express');
var router = express.Router();

/* API */

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Successfully Posted a test message.' });
});

module.exports = router;
