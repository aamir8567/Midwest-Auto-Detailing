var express = require('express');
var router = express.Router();

// ==================================================
// Route to show shopping cart
// ==================================================
router.get('/cart', function(req, res, next) {
    res.render('cart');
 });
 
router.get('/', function(req, res, next) {
	let query = "SELECT service_id, service_name, description,serviceimg, price FROM service"; 

	// execute query
	db.query(query, (err, result) => {
			if (err) {
				console.log(err);
				res.render('error');
				}
			res.render('cart', {cart: result });
			});

});

module.exports = router;
