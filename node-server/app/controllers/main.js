var express = require('express'),
  router = express.Router(),
  glob = require('glob'),
  mongoose = require('mongoose'),   
  User = mongoose.model('User'),
  Campeonato = mongoose.model('Campeonato'),
  Calendario = mongoose.model('Calendario'),
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
      res.status(500).send('Error en getCampeonatos');
    }
  });
});

/*
* GET / Obtenemos todos los participantes
*/
router.get('/getParticipantes', middleware.ensureAuthenticated, function (req, res, next) {
  User.find({}, function (err, participantes) {
    if (!err) {
      res.status(200).send(participantes);
    } else {
      console.log(err);
      res.status(500).send('Error en getParticipantes');
    }
  });
});

/*
  AÑADIR PARTICIPANTE
*/
router.post('/addParticipante', middleware.ensureAuthenticated, function (req, res, next) {
  let participante = req.body;
  new User(participante).save(function (err, newParticipante) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(newParticipante);
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

/*
  ACTUALIZAR CAMPEONATO
*/
router.post('/saveCampeonato', middleware.ensureAuthenticated, function (req, res, next) {
  let campeonato = req.body;
  let _id = campeonato._id;
  delete campeonato._id;
  Campeonato.findByIdAndUpdate(_id, campeonato, function (err, result) {
    if (err) {
      console.log("(saveCampeonato) Problem with Mongodb " + err + '\n');
      res.status(500).send("(saveCampeonato) Problem with Mongodb " + err);
    } else {        
      res.status(200).send({ result: "Campeonato actualizado" });
    }
  });
});

/*
  ACTUALIZAR PARTICIPANTE
*/
router.post('/saveParticipante', middleware.ensureAuthenticated, function (req, res, next) {
  let participante = req.body;
  User.findByIdAndUpdate(participante._id, participante, function (err, result) {
    if (err) {
      console.log("(saveParticipante) Problem with Mongodb " + err + '\n');
      res.status(500).send("(saveParticipante) Problem with Mongodb " + err);
    } else {        
      res.status(200).send({ result: "Participante actualizado" });
    }
  });
});

/*
* Borrado de participantes
*/
router.post('/deleteParticipante', middleware.ensureAuthenticated, function (req, res, next) {
  let participante = req.body;
  User.remove({ _id: participante._id }, function (err) {
    if (err) {
      res.status(500).send("(deleteParticipante) Problem with Mongodb " + err);
    } else {      
      res.status(200).send({ remove: 'OK' });
    }
  });
});

/*
* GET / Obtenemos el calendario
*/
router.get('/getCalendario', middleware.ensureAuthenticated, function (req, res, next) {
  Calendario.find({}, function (err, calendario) {
    if (!err) {
      res.status(200).send(calendario);
    } else {
      console.log(err);
      res.status(500).send('Error en getCalendario');
    }
  });
});

/*
  AÑADIR CALENDARIO
*/
router.post('/addCalendario', middleware.ensureAuthenticated, function (req, res, next) {
  let calendario = req.body;
  new Calendario(calendario).save(function (err, newCalendario) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(newCalendario);
    }
  });
});

/*
* Borrado de calendarios
*/
router.post('/deleteCalendario', middleware.ensureAuthenticated, function (req, res, next) {
  let ev = req.body;
  Calendario.remove({ _id: ev._id }, function (err) {
    if (err) {
      res.status(500).send("(deleteCalendario) Problem with Mongodb " + err);
    } else {      
      res.status(200).send({ remove: 'OK' });
    }
  });
});

/*
  ACTUALIZAR CALENDARIO
*/
router.post('/saveCalendario', middleware.ensureAuthenticated, function (req, res, next) {
  let calendario = req.body;
  Calendario.findByIdAndUpdate(calendario._id, calendario, function (err, result) {
    if (err) {
      console.log("(saveCalendario) Problem with Mongodb " + err + '\n');
      res.status(500).send("(saveCalendario) Problem with Mongodb " + err);
    } else {        
      res.status(200).send({ result: "Calendario actualizado" });
    }
  });
});

/*
* Borrado de campeonatos
*/
router.post('/deleteCampeonato', middleware.ensureAuthenticated, function (req, res, next) {
  let campeonato = req.body;
  Campeonato.remove({ _id: campeonato._id }, function (err) {
    if (err) {
      res.status(500).send("(deleteCampeonato) Problem with Mongodb " + err);
    } else {      
      res.status(200).send({ remove: 'OK' });
    }
  });
});

// Route to authenticate a user (POST http://localhost:3020/authenticate)
router.post('/authenticate', function (req, res) {  
  console.log(req.body.email, req.body.password);
  User.findOne({
    email: req.body.email,
    password: req.body.password
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