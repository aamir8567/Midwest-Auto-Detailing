var express = require('express');
var router = express.Router();

//********************** 
//FOR INITIAL LOAD
//********************** 
router.get('/', function (req, res, next) {
    res.render('reports/report');
});

//******************* */
// FOR CUSTOMER REPORT
//******************* */
router.get('/customer', function (req, res, next) {
    let query = "SELECT customer_id,firstname,middlename,lastname,email,phone,address1,address2,city,state,zip,username,password FROM customer";

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('reports/customer_report', {
            allrecs: result
        });
    });
});

//*********************** 
// FOR CARS REPORT
//************************ */
router.get('/car', function (req, res, next) {
    let query = "SELECT car_id,caryear,carmake,model,cartype,vin,license_plate,carcolor FROM car";

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('reports/car_report', {
            allrecs: result
        });
    });
});

//******************** */
// FOR ORDER DETAILS REPORT
//**************************** */

router.get('/order', function (req, res, next) {
    let query = "SELECT orderdetail_id,order_id,service_id,sale_price,quantity FROM order_detail";

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('reports/order_detail_report', {
            allrecs: result
        });
    });
});

//******************* */
// FOR PROMOTON REPORT
//***************** */
router.get('/promotion', function (req, res, next) {
    let query = "SELECT promo_id,promo_name,promo_desc,promo_image,start_date,end_date,discount_amount FROM promotion";

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('reports/promotion_report', {
            allrecs: result
        });
    });
});

//For SERVICE REPORT
router.get('/service_report', function (req, res, next) {
    let query = "SELECT service_id,service_name,description,price FROM service";

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('reports/service_report', {
            allrecs: result
        });
    });
});
module.exports = router;
