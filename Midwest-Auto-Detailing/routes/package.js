var express = require('express')
var router = express.Router();
//==================================================
// Route to list all records. Display view to list all records// //==================================================
router.get('/', function(req,res,next) {
    let query = "Select package_id, packagename,packageimage, status,saleprice,startingcity,destinationcity FROM package";
}
          
          )