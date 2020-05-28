var express = require('express');
var router = express.Router();

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function (req, res, next) {
    res.render('service/addrec');
});

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function (req, res, next) {
    let query = "SELECT service_id,service_name,description,price,serviceimg FROM service";

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('service/allrecords', {
            allrecs: result
        });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid', function (req, res, next) {
    let query = "SELECT service_id,service_name,description,price,serviceimg FROM service WHERE service_id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('service/onerec', {
                onerec: result[0]
            });
        }
    });
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function (req, res, next) {

    let insertquery = "INSERT INTO service (service_name,description,price,serviceimg) VALUES (?, ?, ?, ?)";

    db.query(insertquery, [req.body.service_name, req.body.description, req.body.price,req.body.serviceimg], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/service');
        }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function (req, res, next) {
    let query = "SELECT service_id,service_name,description,price,serviceimg FROM service WHERE service_id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('service/editrec', {
                rec: result[0]
            });
        }
    });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function (req, res, next) {
    let updatequery = "UPDATE service SET service_name = ?, description = ?, price = ?, serviceimg = ? WHERE service_id = " + req.body.service_id;

    db.query(updatequery, [req.body.service_name, req.body.description, req.body.price,req.body.serviceimg], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/service');
        }
    });
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
    let query = "DELETE FROM service WHERE service_id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/service');
        }
    });
});





module.exports = router;
