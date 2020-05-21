var express = require('express');
var router = express.Router();

/* GET home page. */
/* GET home page. */
router.get('/', function(req, res, next) {
  let query = "SELECT service_id, service_name, description, price FROM service"; 
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
            }

        let query = "SELECT promo_id, promo_name, promo_image FROM promotion WHERE start_date <= CURRENT_DATE() and end_date >= CURRENT_DATE()";
        // execute query
        db.query(query, (err, promos) => {
            if (err) {
                console.log(err);
                res.render('error');
                }
                res.render('index', {allrecs: result, promos: promos });
                });
        });
});

module.exports = router;
