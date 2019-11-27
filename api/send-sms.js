const Nexmo = require('nexmo');
const config = require('../config/env_var');

//giving details to make connection with nexmo api
const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

/* function to send sms to the host cellphone regarding details of visitor
 as soon as visitor makes entry */
exports.send = function(hnum,gname,gemail,gnum,intime){
	const from = 'EMS';
	const to = '91'+hnum;
	const text = 'Hello from Innovaccer Event Management system \n'+'Details of the visitor are:- \n'
	+'NAME :- '+gname+'\nE-mail Address :- '+gemail +'\nContact No :- '+gnum
	+ '\nCheck-In Time :- '+intime;
	nexmo.message.sendSms(from, to, text, (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.log(responseData);
      }
    });
};