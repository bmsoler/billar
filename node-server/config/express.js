var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var cors = require('cors');

module.exports = function(app, config) {

  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));  
  
  if (env === 'production') {    
    //app.use(logger('tiny')); //Impresión mínima en log
    app.use(logger('tiny', { skip: function (req, res) { return res.statusCode < 400 }  })); // Solo imprime los errores
    //app.use(logger('tiny', { skip: function (req, res) { return res.statusCode !== 200 }  })); // Solo imprime los 200 OK
  }else {    
    app.use(logger('dev'));
  }  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(express.static(config.root + '/uploads'));
  app.use(methodOverride());

  app.use(cors());

  //MONGODB - Inclusión de todos los modelos de la base de datos mongodb
  var models = glob.sync(config.root + '/app/models/*.js');
  models.forEach(function (model) {
    require(model);
  });

  //CONTROLADORES ---------------------------------------------------
  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function (err, req, res, next) {   
    if (err){
      if ((err.message).indexOf("Signature verification failed") !== -1){
        res.status(403);
        res.render('error', {
          message: err.message,
          error: err,
          title: 'error'
        });
      }else {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err,
          title: 'error'
        });
      }
    }else {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });        
    }    
  });

  return app;
};
