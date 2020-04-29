var express = require('express');
var router = express.Router();

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function (req, res, next) {
    res.render('promotion/addrec');
});

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function (req, res, next) {
    let query = "SELECT promo_id,promo_name,promo_desc,promo_image,start_date,end_date,discount_amount FROM promotion";

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('promotion/allrecords', {
            allrecs: result
        });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid', function (req, res, next) {
    let query = "SELECT promo_id,promo_name,promo_desc,promo_image,start_date,end_date,discount_amount FROM promotion WHERE promo_id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('promotion/onerec', {
                onerec: result[0]
            });
        }
    });
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function (req, res, next) {

    let insertquery = "INSERT INTO promotion (promo_name,promo_desc,promo_image,start_date,end_date,discount_amount ) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(insertquery, [req.body.promo_name, req.body.promo_desc, req.body.promo_image, req.body.start_date, req.body.end_date, req.body.discount_amount], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/promotion');
        }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function (req, res, next) {
    let query = "SELECT promo_id,promo_name,promo_desc,promo_image,start_date,end_date,discount_amount FROM promotion WHERE promo_id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('promotion/editrec', {
                rec: result[0]
            });
        }
    });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function (req, res, next) {
    let updatequery = "UPDATE promotion SET promo_name = ?, promo_desc = ?, promo_image = ?, start_date = ?, end_date = ?, discount_amount = ?, WHERE promo_id = " + req.body.promo_id;

    db.query(updatequery, [req.body.promo_name, req.body.promo_desc, req.body.promo_image, req.body.start_date, req.body.end_date, req.body.discount_amount], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/promotion');
        }
    });
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
    let query = "DELETE FROM promotion WHERE promo_id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/promotion');
        }
    });
});





module.exports = router;
