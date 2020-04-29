var express = require('express');
var router = express.Router();

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function (req, res, next) {
    res.render('car/addrec');
});

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function (req, res, next) {
    let query = "SELECT car_id,caryear,carmake,model,cartype,vin,license_plate,carcolor FROM car";

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('car/allrecords', {
            allrecs: result
        });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid', function (req, res, next) {
    let query = "SELECT car_id,caryear,carmake,model,cartype,vin,license_plate,carcolor FROM car WHERE car_id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('car/onerec', {
                onerec: result[0]
            });
        }
    });
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function (req, res, next) {

    let insertquery = "INSERT INTO car (caryear,carmake,model,cartype,vin,license_plate,carcolor) VALUES ( ?, ?, ?, ?, ?, ?, ?)";

    db.query(insertquery, [req.body.caryear, req.body.carmake, req.body.model, req.body.cartype, req.body.vin, req.body.license_plate, req.body.carcolor], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/car');
        }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function (req, res, next) {
    let query = "SELECT car_id,caryear,carmake,model,cartype,vin,license_plate,carcolor FROM car WHERE car_id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('car/editrec', {
                rec: result[0]
            });
        }
    });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function (req, res, next) {
    let updatequery = "UPDATE car SET caryear = ?, carmake = ?, model = ?, cartype = ?, vin = ?, license_plate = ?, carcolor = ?,  WHERE car_id = " + req.body.car_id;

    db.query(updatequery, [req.body.caryear, req.body.carmake, req.body.model, req.body.cartype, req.body.vin, req.body.license_plate, req.body.carcolor], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/car');
        }
    });
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
    let query = "DELETE FROM car WHERE car_id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/car');
        }
    });
});





module.exports = router;
