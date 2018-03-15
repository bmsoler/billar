var express = require('express'),
	app = express(),
	fs = require('fs')
	util = require('util'),
  	config = require('./config/config'),
  	glob = require('glob'),  	
  	mongoose = require('mongoose'),
  	cluster = require('cluster'),   	
	numCPUs = require('os').cpus().length,
	https = require('https'),		
	io = null; 

  
// ### ####################################################################
// ### MONGODB ############################################################
// ### ####################################################################
mongoose.connect(config.db, {useMongoClient: true});
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to mongodb database at ' + config.db);
});//######################################################################

// ### #####################################################################################
// ### Arranque del servidor ###############################################################
// ### #####################################################################################
if (config.debug) {

	var server = app.listen(config.port, function () {  
	console.log('Node server Network listening on port ['+ config.port +'] in '+process.env.NODE_ENV+' mode [numCPUs:'+numCPUs+']');
	console.log('[Mongoose] connect', config.db);
	});

} else {

	let key = fs.readFileSync('/usr/local/psa/var/modules/letsencrypt/etc/live/dev.aunnait.es/privkey.pem');
	let cert = fs.readFileSync('/usr/local/psa/var/modules/letsencrypt/etc/live/dev.aunnait.es/cert.pem');	
	let options = {
		key: key,
		cert: cert
	};
	server = https.createServer(options, app).listen(config.port, function () {
		console.log('Node server Network listening on port [' + config.port + '] in ' + process.env.NODE_ENV + ' mode [numCPUs:' + numCPUs + ']');
		console.log('[Mongoose] connect', config.db);
	});

}

// ### #####################################################################################
// ### Arranque del servidor http ##########################################################
// ### #####################################################################################
// var server = app.listen(config.port, function () {  
//   console.log('Node server Network listening on port ['+ config.port +'] in '+process.env.NODE_ENV+' mode [numCPUs:'+numCPUs+']');
//   console.log('[Mongoose] connect', config.db);
// }); 

// ### #########################################################################
// ### SOCKET.IO ###############################################################
// ### #########################################################################
io = require('socket.io').listen(server);
//Número ilimitado de Listeners para socket.io
io.sockets.setMaxListeners(0);

var clientes = 0;
var info_socket;

//Notificación de cliente conectado
io.on('connection', function (socket) {

	info_socket = socket.id;
	if ((socket.request) && (socket.request.connection) && (socket.request.connection._peername) && (socket.request.connection._peername.address)) {
		info_socket = socket.request.connection._peername.address;
	}
	
	clientes++;
	console.log('Network server - Cliente conectado:', info_socket, ', Conexiones actuales: '+clientes);
	socket.on('disconnect', function(){
		clientes--;
		console.log('Network server - Cliente desconectado:', info_socket, ', Conexiones actuales: '+clientes);
	});

});
  

// ### #########################################################################
// ### VARIABLES GLOBALES ######################################################
// ### #########################################################################

//Definimos como global el socket para que esté accesible desde los controllers
global.socketio = io;


// Fichero global de logs
global.log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'}); 


// Definimos la lista de asterisk con la que vamos a trabajar
global.ASTERISKS = []; 

// ### #########################################################################
// ### Exportación de datos al fichero express.js ##############################
// ### #########################################################################
module.exports = require('./config/express')(app, config);   





