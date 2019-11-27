var express = require('express');
var router = express.Router();

var user_entry=require('../controllers/user_entry');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* api to handle POST request of adding visitor details into log register
 at the time of entry of visitors */
router.post('/checkIn',user_entry.checkin);

/* api to handle PATCH request of updating checkout time at the exit of visitors */
router.patch('/checkOut/:gemail',user_entry.checkout);

/* api to handle DELETE request of deleting the entry of visitors */
router.delete('/deleteentry/:gemail',user_entry.removeentry);

/* api to handle GET request of getting details of all the entry of visitors from Logbook */
router.get('/logentry',user_entry.getlogs);

module.exports = router;
