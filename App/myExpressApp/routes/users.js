var express = require('express');
var router = express.Router();
/**require pg library in the app */
const Pool = require('pg').Pool

/**
 * establish a connection with node api database 
 * */
const pool = new Pool({
  host: 'localhost',
  database: 'api',
  port: 5432,
})

/* GET users listing from flask api localhost:5000 */
router.get('/', function(req, res, next) {
  pool.query('SELECT * FROM orders ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
});

module.exports = router;
