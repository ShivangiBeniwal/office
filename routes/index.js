var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Test Auth' });
  res.sendFile(path.join(__dirname, "../src/views/index.html"));
});

module.exports = router;
