var express = require('express');
var router = express.Router();

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function (req, res, next) {
    res.render('workorder/addrec');
});

 

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function (req, res, next) {
    let query = "SELECT order_id,customer_id,car_id,promo_id,addi_details,purchase_date,payment_status FROM workorder";

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('workorder/allrecords', {
            allrecs: result
        });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid', function (req, res, next) {
    let query = "SELECT order_id,customer_id,car_id,promo_id,addi_details,purchase_date,payment_status FROM workorder WHERE order_id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('workorder/onerec', {
                onerec: result[0]
            });
        }
    });
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function (req, res, next) {

    let insertquery = "INSERT INTO workorder (customer_id,car_id,promo_id,addi_details,purchase_date,payment_status) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(insertquery, [req.body.customer_id, req.body.car_id, req.body.promo_id, req.body.addi_details, req.body.purchase_date, req.body.payment_status], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/workorder');
        }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function (req, res, next) {
    let query = "SELECT order_id,customer_id,car_id,promo_id,addi_details,purchase_date,payment_status FROM workorder WHERE order_id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('workorder/editrec', {
                rec: result[0]
            });
        }
    });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function (req, res, next) {
    let updatequery = "UPDATE workorder SET customer_id = ?, car_id = ?, promo_id = ?, addi_details = ?, purchase_date = ?, payment_status = ? WHERE order_id = " + req.body.customer_id;

    db.query(updatequery, [req.body.customer_id, req.body.car_id, req.body.promo_id, req.body.addi_details, req.body.purchase_date, req.body.payment_status], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/workorder');
        }
    });
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
    let query = "DELETE FROM workorder WHERE order_id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/workorder');
        }
    });
});





module.exports = router;
