var express = require('express');
var router = express.Router();

/* GET DCP Page. */
router.get('/', function(req, res, next) {
  res.render('deviceCapability', { title: 'DCP' });
});

module.exports = router;
