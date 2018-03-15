var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),   
    env = process.env.NODE_ENV || 'development';

var config = {

  /*
  ### DESARROLLO - CONFIGURACIÓN PARA EL ENTORNO DE DESARROLLO
  */ 
  development: {    
    debug: true,
    root: rootPath,
    server_url: 'http://localhost:3020/',
    app: { name: 'node-server-network' },
    port: process.env.PORT || 3020,
    db: 'mongodb://localhost/billar',
    TOKEN_SECRET: process.env.TOKEN_SECRET || "tokendevelopment"
  },

  /*
  ### PRODUCCIÓN - CONFIGURACIÓN PARA EL ENTORNO DE PRODUCCIÓN
  */ 
  production: {
    debug: false,
    root: rootPath,
    server_url: 'https://dev.aunnait.es:3020/',
    app: { name: 'node-server-network' },
    port: process.env.PORT || 3020,
    db: 'mongodb://localhost/billar',
    TOKEN_SECRET: process.env.TOKEN_SECRET || "tokendevelopment"   
  }
  
};

module.exports = config[env];