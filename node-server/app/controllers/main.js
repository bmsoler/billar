var express = require('express'),
  router = express.Router(),
  glob = require('glob'),
  mongoose = require('mongoose'),   
  User = mongoose.model('User'),
  Campeonato = mongoose.model('Campeonato'),
  config = require('../../config/config'),
  path = require('path'),
  http = require('http'),
  request = require('request'),
  multer = require('multer'),
  upload = multer({ dest: 'uploads/' }),
  middleware = require('../services/middleware'),
  service = require('../services/service');
  
const moment = require('moment-timezone'); 
moment().tz("Europe/Madrid").format();   
  
module.exports = function (app) {
  app.use('/', router); 
};
  


/*
* UPLOADS IMAGES
*/
var storage = multer.diskStorage({ 
  destination: function (req, file, cb) { cb(null, './uploads'); },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, 'img' + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});
var uploadImage = multer({ storage: storage }).single('file');

router.post('/uploadImage', function (req, res, next) {
  uploadImage(req, res, function (err) {
    if (err) {
      console.log(err);
      res.json({ error_code: 1, err_desc: err });
      return;
    }else {            
      res.json({
        'image': config.server_url + req.file.filename
      });
    }
  });
});


/*
* GET / Obtenemos todos los campeonatos
*/
router.get('/getCampeonatos', middleware.ensureAuthenticated, function (req, res, next) {
  Campeonato.find({}, function (err, campeonatos) {
    if (!err) {
      res.status(200).send(campeonatos);
    } else {
      console.log(err);
      res.status(500).send('Error en loadNodesForTable');
    }
  });
});


/*
  AÑADIR CAMPEONATO
*/
router.post('/addCampeonato', middleware.ensureAuthenticated, function (req, res, next) {
  let campeonato = req.body;
  new Campeonato(campeonato).save(function (err, newCampeonato) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(newCampeonato);
    }
  });
});


// Route to authenticate a user (POST http://localhost:3020/authenticate)
router.post('/authenticate', function (req, res) {  
  //console.log(req.body.email, req.body.password);
  User.findOne({
    email: req.body.email,
    password: req.body.password,
  }, function (err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          user: user,
          token: service.createToken(user)
        });
      }
    }
  });
});