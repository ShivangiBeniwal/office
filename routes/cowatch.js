var express = require('express');
var router = express.Router();

/* GET DCP Page. */
router.get('/', function(req, res, next) {
  res.render('cowatch', { title: 'COWATCH' });
});

module.exports = router;
