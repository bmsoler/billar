var express = require('express'),
  	router = express.Router(),
	util = require('util'),
	ami;
	
var	info_conexion = {info:'[ASTERISK]:', ami:null};   	
  
// PRE-PRODUCCIÓN   
var config = {   
   //ami_url: '172.20.5.215',   
   ami_url: '172.18.74.90',   
   ami_port: '5038',
   ami_user: 'amiasterisk', 
   ami_password: '$VPW6fr5u#Tf4'  
}; 

// PRODUCCIÓN  
// var config = { 
//     ami_url: '172.18.74.88',
//     ami_port: '5038',
//     ami_user: 'amiasterisk', 
//     ami_password: '$VPW6fr5u#Tf4'
// };  


// ### ###############################################################################################################################################################
// ### EXPORTACIÓN ###################################################################################################################################################
// ### ###############################################################################################################################################################
module.exports = function (app) {
  app.use('/', router);
};


 
// ### ###############################################################################################################################################################
// ### AMI CLIENT ####################################################################################################################################################
// ### ###############################################################################################################################################################

ami = new require('asterisk-manager')(config.ami_port, config.ami_url, config.ami_user, config.ami_password, true);

// In case of any connectiviy problems we got you coverd.
ami.keepConnected(); 

// Listen for any/all AMI events.
ami.on('managerevent', function(evt) {
	try{

        console.log(evt);

	}catch (err){
		saveErrorLog('Error exception en Asterisk', err.message); 
	}
});

// Listen for hangup AMI events.
ami.on('hangup', function(evt) {
	//console.log('hangup: ',evt);
});

// Listen for Action responses.
ami.on('response', function(evt) {
	//console.log('response: ',evt);
});


var asterisk = {
	'config' : config,
	'ami' : ami
} 
  
ASTERISKS.push(asterisk);
