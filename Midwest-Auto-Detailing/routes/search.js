var express = require('express');
var router = express.Router();

// ==================================================
// Route to display Search Results
// ==================================================
router.get('/', function(req, res, next) {

    let query = "SELECT service_id,service_name,description,price FROM service WHERE description LIKE '%" + req.body.searchcriteria + "%'";   
    
	// execute query
	db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('search', {allrecs: result});
		} 
	});
});

router.post('/', function(req, res, next) {
	let query = "SELECT service_id,service_name,description,price FROM service WHERE description LIKE '%" + req.body.searchcriteria + "%'";   
	// execute query
	db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('search', {allrecs: result});
		} 
	});
});

module.exports = router;