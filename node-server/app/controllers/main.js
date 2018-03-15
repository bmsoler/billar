var express = require('express'),
  router = express.Router(),
  glob = require('glob'),
  mongoose = require('mongoose'), 
  Nodo = mongoose.model('Nodo'),
  Link = mongoose.model('Link'),
  User = mongoose.model('User'),
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



// Route to authenticate a user (POST http://localhost:3010/authenticate)
router.post('/authenticate', function (req, res) {
  //find the user
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