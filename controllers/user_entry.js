var moment = require('moment');
var mongoose = require('mongoose');
var Entry = require('../model/entry');
var Logbook = require('../model/Logbook');
var mail = require('../api/mailer');
var SMS = require('../api/send-sms');

// controller to handle request of adding visitor details into log register
exports.checkin = function(req,res){
	const time = moment().format('h:mm a');
	var entry = new Entry({
        _id: new mongoose.Types.ObjectId(),
        guestname: req.body.gname,
        guestemail: req.body.gemail,
        guestphone: req.body.gnum,
        Checkin_time: time,
        hostname: req.body.hname,
        hostemail: req.body.hemail,
        hostphone: req.body.hnum
    });
    entry.save(function (err,result) {
        if(err){
        	    res.status(500).json({
                success:false,
                message: 'Sorry! something happened, please try again'
            });
        }
        else
        {
            // function to send mail to host about visitor details
    		mail.send(entry.hostemail,entry.guestname,entry.guestemail,
    			entry.guestphone,entry.Checkin_time);

            //// function to send sms to host about visitor details
    		SMS.send(entry.hostphone,entry.guestname,entry.guestemail,
    			entry.guestphone,entry.Checkin_time);

        	res.status(200).json({
            success: true,
            message: 'Guest Checked In'
        });
		}
    });
};

// controller to handle request of updating checkout time at the exit of visitors
exports.checkout = function(req,res){
	var _gemail = req.params.gemail;
	const time2 = moment().format('h:mm a');
	Entry.findOneAndUpdate({guestemail:_gemail},{$set:{Checkout_time: time2}},{new: true},function (err,result) {
        if(err){
            res.status(500).json({
                success:false,
                message: 'Sorry! CheckOut-time can not be Inserted'
            });
        }
        else
        {
            // function to send mail to visitor about meeting details
        	mail.send2(result.guestemail,result.guestname,result.guestphone,result.Checkin_time,
        	result.Checkout_time,result.hostname);
        	res.status(200).json({
            success: true,
            message: "CheckOut-time Inserted"
        });
        }
    });
};


// controller to handle request of deleting the entry of visitors
exports.removeentry = function(req,res){
	var _gemail = req.params.gemail;
	Entry.findOneAndDelete({guestemail:_gemail},function (err,doc) {
        if(err){
            res.status(500).json({
                success:false,
                message: 'Sorry! Entry can not be Deleted'
            });
        }
        else
        {
            // function call to save deleted entry in Log Book 
        	saveentry(doc);
        	res.status(200).json({
            success: true,
            message: "Entry Deleted"
        });
        }
    });
};

// function to add details of visitor just made exit into logbook database
function saveentry(data){
	var logbook_entry = new Logbook({
        _id: new mongoose.Types.ObjectId(),
        guestname: data.guestname,
        guestemail: data.guestemail,
        guestphone: data.guestphone,
        Checkin_time: data.Checkin_time,
        Checkout_time: data.Checkout_time,
        hostname: data.hostname,
        hostemail: data.hostemail,
        hostphone: data.hostphone
    });
	logbook_entry.save(function (err,result) {
        	if(err){
        	    console.log("Details can't be added in logbook because",err);
        	   }
        	});
}


// controller to handle request of getting details of all the entry of visitors from Logbook
exports.getlogs= function (req,res) {
    Logbook.find({},function (err,result) {
        if(err){
            res.status(400).json({
                success:false,
                message: 'Sorry! No result avaiable'
            });
        }
        else
        {   res.status(200).json({
            success: true,
            data :result
        });}
    });
};