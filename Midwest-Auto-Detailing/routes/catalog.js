var express = require('express');
var router = express.Router();

// ==================================================
// Route to add an item to the cart
// ==================================================
router.post('/add', function(req, res, next) {
	if (typeof req.session.cart !== 'undefined' && req.session.cart ) {
		if (req.session.cart.includes(req.body.service_id))
			{
				// Item Exists in Basket - Increase Quantity 
				var n = req.session.cart.indexOf(req.body.service_id);
				req.session.qty[n] = parseInt(req.session.qty[n]) + parseInt(req.body.qty);
			}
		else
			{
				// Item Being Added First Time
				req.session.cart.push(req.body.service_id);
				req.session.qty.push(req.body.qty);
			}
	}else {
		var cart = [];
		cart.push(req.body.service_id);
		req.session.cart = cart;
		
		var qty = [];
		qty.push(req.body.qty);
		req.session.qty = qty;
	}
  res.redirect('/catalog/cart');
});

// ==================================================
// Route to show shopping cart
// ==================================================
router.get('/cart', function(req, res, next) {
	if (!Array.isArray(req.session.cart) || !req.session.cart.length){
		res.render('cart', {cartitems: 0 });
	} else {	
		let query = "SELECT service_id, service_name, description,serviceimg, price FROM service WHERE service_id IN (" + req.session.cart + ")";

		// execute query
		db.query(query, (err, result) => {
			if (err) {res.render('error');} else  
					{res.render('cart', {cartitems: result, qtys: req.session.qty  });}
		});
	}
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
// Route to remove an item from the cart
// ==================================================
router.post('/remove', function(req, res, next) {
	// Find the element index of the package_id that needs to be removed
  var n = req.session.cart.indexOf(req.body.service_id);
  
  // Remove element from cart and quantity arrays
  req.session.cart.splice(n,1);
  req.session.qty.splice(n,1);

	 res.redirect('/catalog/cart');

});

 
module.exports = router;
