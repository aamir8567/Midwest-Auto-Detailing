var express = require('express');
var router = express.Router();

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function (req, res, next) {
    let query = "SELECT service_id, service_name FROM service";
    // execute query
    db.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.render('error');
        }
        res.render('order_detail/addrec', {service: result});
    });
});

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function (req, res, next) {
    let query = "SELECT orderdetail_id,order_id,service_id,sale_price,quantity FROM order_detail";

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('order_detail/allrecords', {
            allrecs: result
        });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid', function (req, res, next) {
    let query = "SELECT orderdetail_id,order_id,service_id,sale_price,quantity FROM order_detail WHERE orderdetail_id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('order_detail/onerec', {
                onerec: result[0]
            });
        }
    });
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function (req, res, next) {

    let insertquery = "INSERT INTO order_detail (order_id,service_id,sale_price,quantity) VALUES (?, ?, ?, ?)";

    db.query(insertquery, [req.body.order_id, req.body.service_id, req.body.sale_price, req.body.quantity], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/order_detail');
        }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function (req, res, next) {
    let query = "SELECT orderdetail_id,order_id,service_id,sale_price,quantity FROM order_detail WHERE orderdetail_id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {

            let query = "SELECT service_id, service_name FROM service"; 
		        // execute query
		        db.query(query, (err, cats) => {
			    if (err) {
				    console.log(err);
				    res.render('error');
			    }
			res.render('order_detail/editrec', {rec: result[0], service: cats});
 	        });
        }
    });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function (req, res, next) {
    let updatequery = "UPDATE order_detail SET order_id = ?, service_id = ?, sale_price = ?, quantity = ? WHERE orderdetail_id = " + req.body.orderdetail_id;

    db.query(updatequery, [req.body.order_id, req.body.service_id, req.body.sale_price, req.body.quantity], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/order_detail');
        }
    });
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
    let query = "DELETE FROM order_detail WHERE orderdetail_id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/order_detail');
        }
    });
});





module.exports = router;
