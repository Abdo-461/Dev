var express = require('express');
var router = express.Router();

/* render form page */
router.get('/', function(req, res, next) {
  res.render('form', { title: 'Express' });
});

module.exports = router;