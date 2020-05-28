var express = require('express');
var router = express.Router();

// ==================================================
// Route to add an item to the cart
// ==================================================
router.get('/:srvce_id/add', function(req, res, next) {
    cart.push(req.params.srvce_id);
    res.redirect('/catalog');
 });
 
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
			res.render('catalog', {catalog: result });
			});

});

// ==================================================
// Route to remove an item to the cart
// ==================================================
router.get('/:itemid/remove', function(req, res, next) {
    cart.splice(req.params.itemid,1);
    res.render('cart');
    
 });
 
module.exports = router;
