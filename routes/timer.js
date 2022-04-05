var express = require('express');
var router = express.Router();

/* Get TIMER Page. */
router.get('/', function(req, res, next) {
  res.render('timer', { title: 'TIMER' });
});

module.exports = router;
