/* Database model representing Log Book, having details of all entry of visitors
at present not inside office */

const mongoose= require ('mongoose');
const moment= require ('moment');
const LogbookSchema= mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId,

    guestname: {
        type:String,
        required:true
    },

    guestemail: {
    type: String,
    required: true,
    match:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    },

    guestphone: {
        type:String,
        required:true,
        match: /\d{10}/
    },

    Checkin_time: {
    type: String,
    required:true
    },

    Checkout_time: {
    type: String,
    required: true
    },

    hostname:{ 
        type:String,
        required:true
    },

    hostemail: {
    type: String,
    required: true,
    match:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    },

    hostphone:{
        type:String,
        required:true,
        match: /\d{10}/
    }
});

module.exports= mongoose.model('Logbook',LogbookSchema);