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
  BÚSQUEDA DE NODOS
*/
router.post('/searchNodes', middleware.ensureAuthenticated, function (req, res, next) {  
  let method = req.body.method;
  let query = req.body.query;
  Nodo.find({ $or: [
      { name: { '$regex': query, '$options': 'i' } },
      { biography: { '$regex': query, '$options': 'i' } },
      { cargo: { '$regex': query, '$options': 'i' } },
      { web: { '$regex': query, '$options': 'i' } },
      { formacion: { '$regex': query, '$options': 'i' } },
      { experiencia: { '$regex': query, '$options': 'i' } },
      { email: { '$regex': query, '$options': 'i' } },
      { phone: { '$regex': query, '$options': 'i' } },
      { phone2: { '$regex': query, '$options': 'i' } },
      { relaciones: { '$regex': query, '$options': 'i' } }
    ] }
    , function(err, nodos) {
    if (!err){
      let nodes = {
        nodes: nodos
      }
      res.status(200).send(nodes);              
    }else {
      console.log(err);
      res.status(500).send('Error en searchNodes');
    }  
  });   
});


router.post('/getNodes', middleware.ensureAuthenticated, function (req, res, next) {
  let method = req.body.method;
  let ids = req.body.ids;
  let array_ids_nodos = null;
  if (ids.indexOf('_') === -1) {
    array_ids_nodos = ids.split(',');
  }else {
    array_ids_nodos = [];
    let temp;
    for (let index = 0; ids < ids.length; index++) {
      const element = ids[index];
      tmp = element.split('_'); 
      array_ids_nodos.push(tmp[0]);
      array_ids_nodos.push(tmp[1]);
    }    
  }
  
  let array_ids_nodos_no_leidos = [];

  //console.log('Array de nodos:', array_ids_nodos); 

  let data = { links: [], nodes: [] };

  // 1º ===> AÑADIMOS LOS NODOS QUE SE NOS PASAN COMO PARÁMETROS Y LOS MARCAMOS COMO LEIDOS
  Nodo.find({ id: { "$in": array_ids_nodos } }, function (err, nodos) {
    if (err) {              
      res.status(500).send('Error en getNodes (1)');     
    } else {
      for (let index = 0; index < nodos.length; index++) {
        let n = nodos[index];      

        n.loaded = true; //===> ESTOS LOS MARCAMOS COMO LEIDOS PORQUE SON LOS QUE VIENEN EN EL REQUEST        
        data.nodes.push(n);

        //res.status(200).send(data);  

        if (index === (nodos.length - 1)) {

          // 2º ===> BUSCAMOS LOS POSIBLES LINKS QUE TIENEN COMO DESTINO ALGUNO DE ESTOS NODOS
          Link.find({ to: { "$in": array_ids_nodos } }, {'_id': 0, 'from': 1, 'to': 1, 'id':1, 'role':1, 'name':1  }, 
                function (err, links) {

            if (err) {
              console.log(err);
              res.status(500).send('Error en getNodes (2)');      
            } else if (links.length === 0) {
              res.status(200).send(data);
            } else { 
             
              //Añadimos los links y buscamos los nodos correspondientes sin duplicarlos
              for (let index_links = 0; index_links < links.length; index_links++) {
                let link = links[index_links];
                data.links.push(link);

                //Añadimos el id del nodo para buscarlo despues
                if (array_ids_nodos_no_leidos.indexOf(link.from) === -1) array_ids_nodos_no_leidos.push(link.from) //=> Evitamos duplicados
                
                if (index_links === (links.length-1)){

                  //Buscamos todos los nodos con el array de ids que hemos montado
                  Nodo.find({ id: { "$in": array_ids_nodos_no_leidos } }, function (err, nodos_no_leidos) {
                    if (err) {              
                      res.status(500).send('Error en getNodes (3)'); 
                    } else {                      
                      for (let k = 0; k < nodos_no_leidos.length; k++) {
                        data.nodes.push(nodos_no_leidos[k]);                        
                        if (k === (nodos_no_leidos.length-1)) {
                          res.status(200).send(data);  
                        }
                      }                                             
                    }
                  }); 

                }
              }

            }
          });// ###         

        }
      }        
    }    
  });// ### 

});


/*
  AÑADIR NODOS
*/
router.post('/addNodes', middleware.ensureAuthenticated, function (req, res, next) {  
  let nodo = req.body;
  new Nodo(nodo).save(function(err, newNode) {    
    if (err) {       
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(newNode);
    }
  });    
});

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
* GET / Obtenemos todos los nodos para las tablas de datos
*/
router.get('/loadNodesForTable', middleware.ensureAuthenticated, function (req, res, next) {  
  Nodo.find({ }, function (err, nodos) {
    if (!err) {     
      res.status(200).send(nodos);
    } else {
      console.log(err);
      res.status(500).send('Error en loadNodesForTable');
    }
  });
});

/*
* GET / Obtenemos todos los links para las tablas de datos
*/
router.get('/loadLinksForTable', middleware.ensureAuthenticated, function (req, res, next) {
  Link.find({}).populate([    
    {
      path: 'nodo_from',
      model: 'Nodo'
    }, {
      path: 'nodo_to',
      model: 'Nodo'
    }
  ]).exec(function (err, links) {
    if (!err) {
      res.status(200).send(links);
    } else {
      console.log(err);
      res.status(500).send('Error en loadLinksForTable');
    }
  });
});


/*
* Borrado de nodos y sus links asociados
*/
router.post('/deleteNode', middleware.ensureAuthenticated, function (req, res, next) {
  let nodo = req.body.body;
  let id = nodo.id
  Nodo.remove({ _id: nodo._id }, function (err) {
    if (err) {
      res.status(500).send("(deleteNode) Problem with Mongodb " + err);
    } else {      
      res.status(200).send({ remove: 'OK' });

      //Eliminamos los links de los que este nodo es origen
      Link.remove({ from: { $in: [id] } }, function (err2) {
        if (err2) console.log(err2);
      });

      //Eliminamos los links de los que este nodo es destino
      Link.remove({ to: { $in: [id] } }, function (err3) {
        if (err3) console.log(err3);
      });

    }
  });
});


router.post('/addLinks', middleware.ensureAuthenticated, function (req, res, next) {
  let link = req.body;
  let from = link.nodo_from;
  let to = link.nodo_to;
  new Link(link).save(function (err, newLink) {
    if (err) {      
      if (err.code !== 11000) {
        console.log(err);
        res.status(500).send(err);
      } else {        
        res.status(304).send('Link duplicado');
      } 
    } else {
      res.status(200).send(newLink);

      let category_name = '';
      switch (link.type) {
        case 'Empresarial':
          category_name = { 'categories.Empresarial': 1 };
          actualizarCategoriasNodosRelacionados(from, to, category_name);
          break;
        case 'Institucional':
          category_name = { 'categories.Institucional': 1 };
          actualizarCategoriasNodosRelacionados(from, to, category_name);
          break;
        case 'Comercial':
          category_name = { 'categories.Comercial': 1 };
          actualizarCategoriasNodosRelacionados(from, to, category_name);
          break;    
        case 'Social':
          category_name = { 'categories.Social': 1 };
          actualizarCategoriasNodosRelacionados(from, to, category_name);
          break;           
        case 'Otras':
          category_name = { 'categories.Otras': 1 };
          actualizarCategoriasNodosRelacionados(from, to, category_name);
          break;                       
        default:
          break;
      }

    } 
  });
});


/*
* Borrado delinks
*/
router.post('/deleteLink', middleware.ensureAuthenticated, function (req, res, next) {
  let link = req.body; 
  let from = link.nodo_from; 
  let to = link.nodo_to; 
  Link.remove({ _id: link._id }, function (err) {
    if (err) {
      res.status(500).send("(deleteLink) Problem with Mongodb " + err);
    } else {
      res.status(200).send({ remove: 'OK' });

      let category_name = '';
      switch (link.type) {
        case 'Empresarial':
          category_name = { 'categories.Empresarial': -1 };
          actualizarCategoriasNodosRelacionados(from, to, category_name);
          break;
        case 'Institucional':
          category_name = { 'categories.Institucional': -1 };
          actualizarCategoriasNodosRelacionados(from, to, category_name);
          break;
        case 'Comercial':
          category_name = { 'categories.Comercial': -1 };
          actualizarCategoriasNodosRelacionados(from, to, category_name);
          break;
        case 'Social':
          category_name = { 'categories.Social': -1 };
          actualizarCategoriasNodosRelacionados(from, to, category_name);
          break;          
        case 'Otras':
          category_name = { 'categories.Otras': -1 };
          actualizarCategoriasNodosRelacionados(from, to, category_name);
          break;
        default:
          break;
      }

    }
  });
});

//Aquí vamos a incrementar el número correspondiente de categorias de los enlaces
function actualizarCategoriasNodosRelacionados(from, to, category_name) {
  Nodo.findByIdAndUpdate(from, { $inc: category_name },
    function (err, result) {
      if (err) {
        console.log(err);
      }
    });
  Nodo.findByIdAndUpdate(to, { $inc: category_name },
    function (err, result) {
      if (err) {
        console.log(err);
      }
    });
}

router.post('/updateNode', middleware.ensureAuthenticated, function (req, res, next) {  
  let node = req.body;
  let _id = node._id;
  delete node._id;
  Nodo.findByIdAndUpdate(_id, node, function (err, result) {
    if (err) {
      console.log("(updateNode) Problem with Mongodb " + err + '\n');
      res.status(500).send("(updateNode) Problem with Mongodb " + err);
    } else {        
      res.status(200).send({ result: "Nodo actualizado" });
    }
  });
});


router.post('/updateLink', middleware.ensureAuthenticated, function (req, res, next) {
  let data = req.body;
  
  let link = data.link;
  let old_type = link.type;
  let new_type = data.new_type;
  let from = link.nodo_from;
  let to = link.nodo_to; 

  Link.findByIdAndUpdate(link._id, { $set: { type: new_type } }, function (err, resultado) {
    if (err) {
      console.log("(updateLink) Problem with Mongodb " + err + '\n');
      res.status(500).send("(updateLink) Problem with Mongodb " + err);
    } else {

      res.status(200).send({ result: "Link actualizado" });

      //DECREMENTAMOS LA CATEGORÍA ANTERIOR DE LOS DOS NODOS
      let category_name = '';
      switch (old_type) {
        case 'Empresarial':
          category_name = { 'categories.Empresarial': -1 };
          console.log('OLD:', category_name)
          actualizarCategoriasNodosRelacionados(from, to, category_name);
          break;
        case 'Institucional':
          category_name = { 'categories.Institucional': -1 };
          actualizarCategoriasNodosRelacionados(from, to, category_name);
          break;
        case 'Comercial':
          category_name = { 'categories.Comercial': -1 };
          actualizarCategoriasNodosRelacionados(from, to, category_name);
          break;
        case 'Social':
          category_name = { 'categories.Social': -1 };
          actualizarCategoriasNodosRelacionados(from, to, category_name);
          break;
        case 'Otras':
          category_name = { 'categories.Otras': -1 };
          actualizarCategoriasNodosRelacionados(from, to, category_name);
          break;
        default:
          break;
      }

      //INCREMENTAMOS LA NUEVA DE LOS DOS NODOS
      let category_name2 = '';
      switch (new_type) {
        case 'Empresarial':
          category_name2 = { 'categories.Empresarial': 1 };
          actualizarCategoriasNodosRelacionados(from, to, category_name2);
          break;
        case 'Institucional':          
          category_name2 = { 'categories.Institucional': 1 };
          console.log('NEW:', category_name2)
          actualizarCategoriasNodosRelacionados(from, to, category_name2);
          break;
        case 'Comercial': 
          category_name2 = { 'categories.Comercial': 1 };
          actualizarCategoriasNodosRelacionados(from, to, category_name2);
          break;
        case 'Social':
          category_name2 = { 'categories.Social': 1 };
          actualizarCategoriasNodosRelacionados(from, to, category_name2);
          break;
        case 'Otras':
          category_name2 = { 'categories.Otras': 1 };
          actualizarCategoriasNodosRelacionados(from, to, category_name2);
          break;
        default:
          break;
      }

    }
  });
}); 

/* ############################################################################################### */
/* OJO!!!!!!!!!!!!!!!!!! RESET DE TODAS LAS CATEGORÍAS DE LOS NODOS ############################## */
/* ############################################################################################### */
function resetCategoriasNodos() {
  let reset_categories = {
    "Otras": 0,
    "Social": 0,
    "Comercial": 0,
    "Empresarial": 0,
    "Institucional": 0
  };
  Nodo.update({}, { $set: { categories: reset_categories } }, { multi: true },
    function (err, result) {
      if (err) {
        console.log(err);      
      } else {
        console.log('Categorías reseteadas.....');
        console.log('Actualizando nodos....');
        actualizarNumeroCategoriasNodos();
      }
    }); 
}
function actualizarNumeroCategoriasNodos(){
  Link.find({}, function (err, links) {
    if (err) {
      console.log(err);
    } else {
      let category_name = '';
      for (let index = 0; index < links.length; index++) {
        const link = links[index];
        const from = link.nodo_from;
        const to = link.nodo_to;
        switch (link.type) {
          case 'Empresarial':
            category_name = { 'categories.Empresarial': 1 };
            actualizarCategoriasNodosRelacionados(from, to, category_name);
            break;
          case 'Institucional':
            category_name = { 'categories.Institucional': 1 };
            actualizarCategoriasNodosRelacionados(from, to, category_name);
            break;
          case 'Comercial':
            category_name = { 'categories.Comercial': 1 };
            actualizarCategoriasNodosRelacionados(from, to, category_name);
            break;
          case 'Social':
            category_name = { 'categories.Social': 1 };
            actualizarCategoriasNodosRelacionados(from, to, category_name);
            break;
          case 'Otras':
            category_name = { 'categories.Otras': 1 };
            actualizarCategoriasNodosRelacionados(from, to, category_name);
            break;
          default:
            break;
        }
        if (index === (links.length - 1)) console.log('Nodos actualizandos');
      }
    }
  });
}

//resetCategoriasNodos();

/* ############################################################################################### */
/* ############################################################################################### */
/* ############################################################################################### */



// ### #########################################################################
// ### crearLlamadaSaliente ####################################################
// ### #########################################################################

/**
   * @api {put} /crearLlamada/:origen/:destino Crear una llamada saliente
   * @apiVersion 2.0.0
   * @apiName CreaLlamada
   * @apiGroup Llamadas salientes
   *
   * @apiParam {String} origen Número de origen de la llamada.
   * @apiParam {String} destino Número de destino de la llamada.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "code": 200,
   *       "response": true
   *     }
   *
   * @apiError 404_Not_Found El servicio no ha sido encontrado.
   * @apiError 400_Bad_Request El request no es correcto.
   * @apiError 422_Unprocessable_Entity Error en la validación.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "Método no encontrado"
   *     }
   *
   *     HTTP/1.1 400 Bad Request
   *     {
   *       "error": "El request no es correcto"
   *     }
   *
   *     HTTP/1.1 422 Unprocessable Entity
   *     {
   *       "error": "Error en la validación"
   *     }
   */
router.put('/crearLlamada/:origen/:destino', middleware.ensureAuthenticated, function (req, res, next) {
  try {
    let origen = req.params.origen;
    let destino = req.params.destino;
    console.log(origen, destino);
    let asterisk = ASTERISKS[0];

    asterisk.ami.action({
      'action': 'originate',
      'channel': 'SIP/' + origen + '@trunk',
      'context': 'outgoing',
      'exten': destino,
      'callerid': 'Bubbles',
      'priority': 1
    }, function (err, res) {
      if (err) {
        console.log('Error en (PUT crearLlamada) ami action originate', err.message);
        res.status(500).send("Error");  
      } else if (res) {
        console.log('#### Resultado del originate');
        console.log(res);
        res.status(200).send("Procesado correctamente");  
      }
    }); 
      
  } catch (error) {
    res.status(500).send("Error"); 
  }

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