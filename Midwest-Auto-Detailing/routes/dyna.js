var express = require('express')
var router = express.Router();

/* Get dynamic page */
router.get('/', function(req,res,next){
    res.render('dyna',{passeddata:'SampleData'}); 
});

module.exports = router;