/* Database Model to hold details of visitor and host till the time visitor is in Office */

const mongoose= require ('mongoose');
const moment= require ('moment');
const entrySchema= mongoose.Schema({

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
    default: moment().format("h:mm a")
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

module.exports= mongoose.model('entry',entrySchema);