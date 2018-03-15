<template>
  <v-container fluid style="padding-top: 0px !important ">
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>

        <div id="overlay"><h1>Loading</h1></div>
        <div id="controls" style="margin-top:0px; padding: 0px" class="fadeIn">
            <section id="search-chart">
                <input id="q" v-model="search" style="border-radius: 10px;">
                <button id="search">Search</button>
                <!-- <button id="clear">Clear</button> -->               
                <v-btn icon id="removeSearch" @click="clearSearch">
                    <v-icon>clear</v-icon>
                </v-btn> 
            </section>
            <!-- <section id="imdb-rating"> 
                <p style="color:white; font-weight: bold;">RELEVANCIA<small> <strong>5</strong></small></p>
                <a href="#" class="imdb-rating off" title="10">Star</a>
                <a href="#" class="imdb-rating off" title="9">Star</a>
                <a href="#" class="imdb-rating off" title="8">Star</a>
                <a href="#" class="imdb-rating off" title="7">Star</a>
                <a href="#" class="imdb-rating off" title="6">Star</a>
                <a href="#" class="imdb-rating on" title="5">Star</a>
                <a href="#" class="imdb-rating on" title="4">Star</a>
                <a href="#" class="imdb-rating on" title="3">Star</a>
                <a href="#" class="imdb-rating on" title="2">Star</a>
                <a href="#" class="imdb-rating on" title="1">Star</a> 
            </section>  -->
            <!-- <section id="years"> 
                <p style="color:white; font-weight: bold;">Year:<small><strong id="yearFrom">1900.</strong> - <strong id="yearTo">2018.</strong></small></p>
            </section> -->
            <section style="width: 600px">
                <v-slider id="nivel" style="width: 450px !important; position: absolute" :label="nivel_label" dark thumb-color="cyan" v-model="nivel" thumb-label step="1" min="1" max="10" ticks></v-slider>    
                <a style="position: absolute; right: 25px; width: 100px; top: 27px" id="autozoom"><v-checkbox  dark :label="`Autozoom`" v-model="autozoom"></v-checkbox></a>         
            </section>
        </div>

        <div id="demo" dark class="fadeIn"   
            style="border-radius: 10px; margin-left: 5px"         
            v-bind:style="{  height: window_height + 'px', background: fondoBurbujas+'' }">
        </div>

      </v-layout>
    </v-slide-y-transition>

    <!-- ALERTA DE NO EXISTENCIA DE DATOS EN LA BÚSQUEDA -->
    <v-dialog v-model="alert_no_data_search" max-width="500px">
        <v-card>
            <v-card-title>
            <h4>La búsqueda no ha obtenido resultados</h4>
            <v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
            <v-btn flat @click.stop="alert_no_data_search=false">Cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-fab-transition>
        <v-tooltip left>
            <v-btn
                slot="activator"    
                router to="/Datos"
                dark
                fab
                fixed
                bottom
                right
                small
                style="background-color: rgba(255, 255, 255, 0.2)">
                <v-icon>add</v-icon>
            </v-btn>
        <span>AÑADIR NODOS</span>
        </v-tooltip>      
    </v-fab-transition>
    
  </v-container>
</template> 

<script>

import axios from 'axios'

export default {
    data () {
      return {                 
          window_height: 700,
          //fondoBurbujas: 'rgba(232, 231, 231, 0.15);',
          //fondoBurbujas: 'white',
          fondoBurbujas: '#ffffffed',
          alert_no_data_search: false,
          autozoom: true,
          zooming: null,
          nivel: 1,
          nivel_label: 'Nivel de enlaces relacionados',
          token: null
      }
    },

    methods: {
    
        /* 
            FUNCIÓN PRINCIPAL PARA CARGAR EL GŔAFICO DE LAS BURBUJAS 
        */
        init(){            
        
            const PRINT_DATA_RECEIVED = false;

            let vm = this

            //Ajuste al height de la pantalla actual
            this.window_height = window.innerHeight - 200;   
            
            //Autozoom
            this.zooming =  {
                zoomExtent: [0.1, 3],
                autoZoomExtent: [1, 1.5],
                autoZoomSize: 0.5,          //Control del tamaño inicial [0-1]
                autoZoomAfterClick: true   // Blas -> autozoom al clicar un nodo
            }            
            
            function _(output) {
                console.log(output);
            }
            
            $("#search").on("click", function() {                
                search();
            });
            $("#clear").on("click", function() {
                $("#q").val("");
                netChart.updateSettings({navigation: {initialNodes: []}});
                hidePieChart();
                $("#q").focus();
            });
            $("#removeSearch").on("click", function() {                
                $("#q").val("");
                netChart.updateSettings({navigation: {initialNodes: []}});
                hidePieChart();
                $("#q").focus();
                // Si quitamos esta llamada no sacará todos los nodos al borrar la búsqueda
                search();
            });            
            $("#q").on("click", function(ev) {
                $(this).select();
            });
            $("#q").on("keydown", function(ev) {
                var k = ev.keyCode || ev.which; 
                if (k == 13) {
                    search();
                    ev.preventDefault();
                }
            });

            /* Blas - para seleccionar el nodo desde el popup */
            $("#demo").on("click", "#buscarNodo", function(ev) {
                let name = $( "#demo" ).find( "#nodeName" ).html()                
                this.search = name
                $("#q").val(name)             
                search()
            });

            /* Blas - para editar un nodo desde el popup */
            $("#demo").on("click", "#nodoID", function(ev) {
                let _id = $( "#demo" ).find( "#nodoID" ).attr('nodoID');                
                vm.$store.state.edit_node = _id
                vm.$router.push('/Datos')                                
            });            

            /* Blas - para editar un nodo desde el popup */
            $("#controls").on("click", "#autozoom", function(ev) {                    
                if (vm.autozoom)  {
                    netChart.updateSettings({interaction: {zooming: {zoomExtent:[0.1, 3]} } });  
                    netChart.updateSettings({interaction: {zooming: {autoZoomExtent:[1, 1.5]} } });  
                    netChart.updateSettings({interaction: {zooming: {autoZoomSize:0.5} } });  
                    netChart.updateSettings({interaction: {zooming: {autoZoomAfterClick:true} } });  
                }else {
                    //netChart.updateSettings({interaction: {zooming: {zoomExtent:[0, 0]} } }); //Si descomente este no funciona el aumentar con el ratón.  
                    netChart.updateSettings({interaction: {zooming: {autoZoomExtent:[1, 1]} } });  
                    netChart.updateSettings({interaction: {zooming: {autoZoomSize:0} } });  
                    netChart.updateSettings({interaction: {zooming: {autoZoomAfterClick:false} } });                
                } 
            }); 

            /* Blas - seleccionar el nivel de enlaces hijos */
            $("#controls").on("click", "#nivel", function(ev) {               
               netChart.updateSettings({navigation: {focusNodeExpansionRadius: vm.nivel}});                     
            }); 

            function search() {
                hidePieChart();
                $("#q").attr("disabled", true);
                searchText = $("#q").val().toLowerCase();
                if (netChart) {
                    var searchOk = function(data) {
                        if (data.error) {

                            alert(data.error);

                        } else if (data.nodes.length == 0) {

                            //alert("Nothing found");
                            vm.alert_no_data_search = true

                        } else {
                            if (PRINT_DATA_RECEIVED) console.log('Datos SEARCH:', data);
                            var ids = [];
                            for (var i in data.nodes) {
                                ids.push(''+data.nodes[i].id);
                            }
                            searchIds = ids;                            
                            netChart.updateSettings({navigation: {initialNodes: ids}});
                        }
                        $("#q").attr("disabled", false);
                    };

                    // jQuery.ajax({
                    //     type: "GET",
                    //     url: "https://cpapi.zoomcharts.com/moviedb/api",
                    //     data: {method: "search", query: searchText},
                    //     success: searchOk,
                    //     error: null
                    // });                    
 
                    axios.post(vm.$store.state.URL_NODE_SERVER+`/searchNodes`, 
                        { method: "search", query: searchText },
                        { headers : {'Authorization': 'Bearer ' + vm.token }})
                        .then(response => {
                            searchOk(response.data)                             
                        })
                        .catch(e => {
                            console.log(e)
                        })                

                }
            }
            
            function nodeTopicValue(node){
                var val = 0;
                if (activeSlice) {
                    var topic = activeSlice.id;
                    if (node.data.categories){
                        //Blas
                        //console.log(node.data.categories, topic);
                        if (node.data.categories.hasOwnProperty(topic)){
                            val =  node.data.categories[topic];
                        }
                    } else if (node.data.genre){
                        if (node.data.genre.indexOf(topic) >= 0){
                            val = 5;
                        }
                    }
                }else {
                    return 1;
                }
                return val;
            }

            function nodeRadius(node) {
                node.relevance = 1;
                node.isHidden = false;
                var isRelevant = false;
                var topImdb = 0;

                if (node == activeNode) {
                    node.radius = 50;
                    isRelevant = true;
                } else if (activeNode && node != activeNode) {
                    //compute node radius based on selected topic
                    var hasLink = false;
                    //relevance of links to this node
                    for (var linkInd in node.links) {
                        var link = node.links[linkInd];
                        hasLink |= (link.from == activeNode || link.to == activeNode);
                    }
                    if (hasLink) {
                        var topicValue = nodeTopicValue(node);
                        isRelevant = true;
                        node.radius = 20 + topicValue * 8;
                    } else {
                        // no links to active node
                        node.radius = 15;
                    }
                } else { //default size
                    node.radius = 40;
                    if (sortMode == "imdb" && node.data.imdb_rating) {
                        var filterLimit = filters.imdb;
                        var coef = 1 + (parseFloat(node.data.imdb_rating) - filterLimit) / (10 - filterLimit + 0.1);
                        node.radius = Math.max(20, node.radius * coef);
                    }
                }
                // compute actor max IMDB and if is next to last node
                if (node == lastNode) {
                    isRelevant = true;
                }
                for (var linkInd in node.links) {
                    var neighbor = node.links[linkInd].otherEnd(node);
                    var imdbR = neighbor.data.imdb_rating;
                    if (imdbR > topImdb) {
                        topImdb = imdbR;
                    }
                    if (neighbor == lastNode) {
                        isRelevant = true;
                    }
                }

                node.isBadImdb = ((node.data.type == "movie" && parseFloat(node.data.imdb_rating) < filters.imdb) || (node.data.type == "actor" && topImdb < filters.imdb));

                var invalidYear = false;
                if (node.data.type == "movie") {
                    var year = parseInt(node.data.released);
                    if (year < filters.yearFrom || year > filters.yearTo) {
                        invalidYear = true;
                    }
                }
                if ((!isRelevant && node.isBadImdb) || invalidYear) {
                    node.isHidden = true;
                    node.radius = 20;
                    node.relevance = 0.7;
                }
                return node;
            }
            
            function nodeStyle(node) {
                var label;
                var highlighted = searchText && (searchIds.indexOf(node.data.id) != -1);
                node.items = [];

                if (node.data.type == "actor") {
                    node.display = "image";
                    node.image = "../static/img/male.png";
                    node.imageCropping = "crop";
                    node.radius *= 0.6;
                    label = node.data.name;
                    
                    if (node.data.image) {
                        node.fillColor = "rgba(0,0,0,0.2)";
                    } else if (node.data.gender == "female") {
                        node.fillColor = "pink";
                    } else if (node.data.gender == "male") {
                        node.fillColor = "skyblue";
                    } else {
                        node.fillColor = "gray";
                    }
                    if (!node.isHidden || node.hovered) {
                        node.opacity = 1;
                    } else {
                        node.fillColor = "black";
                        node.opacity = 0.2; 
                        label = "";
                    }

                } else { // movie
                    node.aura = node.data.genre;
                    node.display = "image";
                    node.lineWidth = 1;
                    node.lineColor = "#eee";
                    label = node.data.name;
                    year = parseInt(node.data.released);
                    if (year) {
                        //label += " (" + year + ")";
                    }

                    if (node.data.raiz){                        
                        node.labelStyle.textStyle.font = Math.min(10, 4 + node.radius / 4) + "px Arial";
                        node.labelStyle.textStyle.fillColor = "white";
                        node.labelStyle.backgroundStyle.fillColor = "#E65100";
                        node.labelStyle.backgroundStyle.lineWidth = 5;
                        node.labelStyle.backgroundStyle.lineColor = "#E65100";
                    }else if (node.data.remarcar){   
                        node.labelStyle.textStyle.font = Math.min(10, 4 + node.radius / 4) + "px Arial";
                        node.labelStyle.textStyle.fillColor = "white";
                        node.labelStyle.backgroundStyle.fillColor = "purple";
                        node.labelStyle.backgroundStyle.lineWidth = 5;
                        node.labelStyle.backgroundStyle.lineColor = "purple";     
                    }else {
                        node.labelStyle.textStyle.font = Math.min(9, 4 + node.radius / 4) + "px Arial";
                        node.labelStyle.textStyle.fillColor = "white";
                        node.labelStyle.backgroundStyle.fillColor = "#0097A7";
                        node.labelStyle.backgroundStyle.lineWidth = 4;
                        node.labelStyle.backgroundStyle.lineColor = "#0097A7";
                    }

                    node.image = "../static/img/movie-case-no-poster.png";                    
                    node.imageCropping = "crop";    // Blas -> "fit" | boolean | "crop" | "letterbox"
                    if (!node.isHidden || node.hovered) {
                        node.fillColor = null;
                        node.opacity = 1;
                        // Blas -> Globo amarillo con la relevancia de cada nodo
                        // if (!node.isBadImdb) {
                        //     node.items.push({
                        //         text: starString + " " + node.data.imdb_rating,
                        //         px: -.45, py: 0.65, x: 0, y: 0,
                        //         textStyle: {fillColor: "black"}, backgroundStyle: {fillColor: "#f5de50"}
                        //     });
                        // } else {
                        //     node.items.push({
                        //         text: starString + " " + node.data.imdb_rating,
                        //         px: -.45, py: 0.65, x: 0, y: 0,
                        //         textStyle: {fillColor: "white"}, backgroundStyle: {fillColor: "#c00"}
                        //     });
                        // }
                        if ((node.data.awards) && (node.data.awards.match(/won/i))) {
                            node.items.push({
                                image: "../static/img/award.png",
                                px: -0.56, py: -0.72, x: 0, y: 0,
                                backgroundStyle: {fillColor: null}
                            });
                        }
                    } else {
                        node.fillColor = "black";
                        node.opacity = 0.2;
                        label = "";
                        node.items.push({
                            text: starString + " " + node.data.imdb_rating,
                            px: -.45, py: 0.65, x: 0, y: 0,
                            textStyle: {fillColor: "#ecc"}, backgroundStyle: {fillColor: "#800"}
                        });
                    }

                }

                //Imagen del nodo
                if (node.data.image) {            
                    node.image = node.data.image;
                }
                
                if (node == activeNode) { //move label up to not intersect with pie chart
                    node.label = "";

                    let color_fondo = '#8E24AA', lineWidth = 2;
                    if (node.data.raiz){
                        color_fondo = '#E65100';
                        lineWidth = 3;
                    }
                    node.items.push({
                        text: label,
                        // Blas -> control del nombre en los nodos cuando son seleccionados
                        px: 0, py: 1, x: 0, y: 40,
                        textStyle: { fillColor: "white" }, 
                        backgroundStyle: {fillColor: color_fondo, lineWidth: lineWidth}                        
                        // px: 0, py: 1, x: 0, y: -20,
                        // textStyle: { fillColor: "black" }, 
                        // backgroundStyle: {fillColor: "rgba(255,255,255,0.7)"}
                    });
                } else {
                    node.label = label;
                }
                if (highlighted) {
                    // Blas -> Style del globo informativo
                    if (node.data.raiz){ 
                        node.labelStyle.textStyle.fillColor = "white";
                        node.labelStyle.backgroundStyle.fillColor = "#E65100";
                        node.labelStyle.backgroundStyle.lineWidth = 2;
                        node.labelStyle.backgroundStyle.lineColor = "#E65100";   
                    }else {
                        node.labelStyle.textStyle.fillColor = "white";
                        node.labelStyle.backgroundStyle.fillColor = "#8E24AA";
                        node.labelStyle.backgroundStyle.lineWidth = 2;
                        node.labelStyle.backgroundStyle.lineColor = "#8E24AA";   
                    }                 
                    //Original
                    // node.labelStyle.textStyle.fillColor = "black";
                    // node.labelStyle.backgroundStyle.fillColor = "yellow";
                    // node.labelStyle.backgroundStyle.lineWidth = 6;
                    // node.labelStyle.backgroundStyle.lineColor = "yellow";
                    // ./Original
                    // node.labelStyle = {
                    //     textStyle: {fillColor: "black"},
                    //     backgroundStyle: {fillColor: "yellow", lineWidth: 6, lineColor: "yellow"}
                    // };                    
                }
                if (node.focused && node.selected) {
                    node.label = "";
                }
                return node;
            }

            //Blas
            //Para mostrar u ocultar este menú hay que quitar el display:none de los estilos
            //display: none !important; ---> línea 608 +- de zc.css
            function nodeMenu(data, node) {
                let popup = "<div align='center'> <img src='" + node.image + "' style='max-width: 80%; border-radius: 5px;max-height: 250px' /></div>" +

                    "<i id='nodoID' nodoID='"+data._id+"' style='position: absolute; top: 50px; right: 0; color: #7CB342 !important; cursor: pointer; margin: 20px; font-size: 25px;' class='material-icons'>border_color</i>"+
                    "<i id='buscarNodo' style='position: absolute; top: 0px; right: 0; color: purple !important; cursor: pointer; margin: 20px; font-size: 25px;' class='material-icons'>share</i>"+

                    "<div align='center' style='width: 100%;margin-top: 20px; margin-bottom:20px;'><span id='nodeName' style='color:#175A79; font-size: 25px'>" + data.name + "</span></div>";

                    //Cargo
                    if (data.cargo && data.cargo.length > 0) {
                        popup = popup + "<div align='center'style='width: 100%; margin-bottom:15px;'><span style='padding: 5px; color: purple; font-size: 15px'><i>" + data.cargo + "</i></span></div>";
                    }

                    //Información
                    if (data.biography && data.biography.length > 0) {
                        popup = popup + "<p style='text-align: justify; padding-top: 5px;'>" + data.biography + "</p>";
                        popup = popup + "<div style='width: 100%; margin-bottom: 15px;'><hr></div>";
                    }

                    //Formación
                    if (data.formacion && data.formacion.length > 0) {
                        popup = popup + "<span style='font-size: 11px;font-weight: bold;'>FORMACIÓN</span><br><p style='text-align: justify; padding-top: 5px;'>" + data.formacion + "</p>";
                        popup = popup + "<div style='width: 100%; margin-bottom: 15px;'><hr></div>";
                    }

                    //Experiencia
                    if (data.experiencia && data.experiencia.length > 0) {
                        popup = popup + "<span style='font-size: 11px;font-weight: bold;'>EXPERIENCIA</span><br><p style='text-align: justify; padding-top: 5px;'>" + data.experiencia + "</p>";
                        popup = popup + "<div style='width: 100%; margin-bottom: 15px;'><hr></div>";
                    }

                    //Otras relaciones
                    if (data.relaciones && data.relaciones.length > 0) {
                        popup = popup + "<span style='font-size: 11px;font-weight: bold;'>OTRAS RELACIONES</span><br><p style='text-align: justify;padding-top: 10px'>";
                        
                        for (let index = 0; index < data.relaciones.length; index++) {
                            const relation = data.relaciones[index];
                            popup = popup + "<span> · " + relation + "</span><br>";
                        }
                                                
                        popup = popup + "</p><div style='width: 100%; margin-bottom: 15px;'><hr></div>";
                    }

                    //Email
                    if (data.email && data.email.length > 0) {
                        popup = popup + "<span style='font-size: 11px;font-weight: bold; '>EMAIL</span><br>"+
                            "<p style='text-align: justify; padding-top: 5px;'><a style='font-size: 13px;color: purple;' href='mailto:"+data.email+"'>" + data.email + "</a></p>";
                        popup = popup + "<div style='width: 100%; margin-bottom: 15px;'><hr></div>";
                    }        
                    
                    //Web
                    if (data.web && data.web.length > 0) {
                        let path = data.web
                        if ((path.indexOf('http://') === -1) && (path.indexOf('https://') === -1))  path = 'http://' + path
                        popup = popup + "<span style='font-size: 11px;font-weight: bold;'>WEB</span><br><div style='width: 100%; margin-top: 5px;'><span style='padding: 0px; cursor:pointer'>"+
                            "<a style='font-size: 13px;color: purple;' href='"+path+"' target='_blank'>Ir a la web"+
                            "<i class='material-icons' style='position: absolute; margin-top: -2px; margin-left: 5px'>open_in_new</i></a></span><div><br>";
                        popup = popup + "<div style='width: 100%; margin:auto; margin-bottom: 15px;'><hr></div>";                            
                    }                      

                    //Teléfonos
                    if ((data.phone && data.phone.length > 0) || (data.phone2 && data.phone2.length > 0)) {
                        popup = popup + "<span style='font-size: 11px;font-weight: bold;'>TELÉFONOS</span><br>";
                    }
                    if (data.phone && data.phone.length > 0) {
                        popup = popup + "<div align='left' style='margin-top: 10px'>"+
                            "<a href='#' alt='Contactar' title='Contactar' style='color: purple; margin-right: 15px;font-size: 15px;'><i style='float: left; margin-right: 5px;font-size: 20px;' class='material-icons'>phone_forwarded</i>" + data.phone + "</a></div>";                    
                    }
                    if (data.phone2 && data.phone2.length > 0){
                        popup = popup + "<div style='margin-top: 10px'>"+
                            "<a  href='#' alt='Contactar' title='Contactar' style='color: purple; margin-right: 15px;font-size: 15px;'><i style='float: left; margin-right: 5px;font-size: 20px;' class='material-icons'>phone_forwarded</i>" + data.phone2 + "</a></div>";
                    }
                    if ((data.phone && data.phone.length > 0) || (data.phone2 && data.phone2.length > 0)) {
                        popup = popup + "<div style='width: 100%; margin-top:15px; margin-bottom: 15px;'><hr></div>"; 
                    }

                    //Redes sociales
                    popup = popup + "<div style='margin-top: 20px; height: 120px' align='left'>";
                    if ((data.linkedin) || (data.twitter)|| (data.youtube) || (data.instagram) || (data.facebook))  {
                        popup = popup + "<span style='font-size: 11px;font-weight: bold;'>REDES SOCIALES</span><br><br>";
                    }
                    if (data.linkedin && data.linkedin.length > 0) {
                        popup = popup + "<a href='"+data.linkedin+"' target='_blank'><img src='static/linkedin.png' style='float: left; width: 30px; margin-right: 10px'/></a>";
                    }                    
                    if (data.twitter && data.twitter.length > 0) {
                        popup = popup + "<a href='"+data.twitter+"' target='_blank'><img src='static/twitter.png' style='float: left; width: 42px; margin-top: -6px; margin-right: 10px'/></a>";
                    }  
                    if (data.youtube && data.youtube.length > 0) {
                        popup = popup + "<a href='"+data.youtube+"' target='_blank'><img src='static/youtube.png' style='float: left; width: 36px; margin-top: -3px; margin-right: 10px'/></a>";
                    }           
                    if (data.instagram && data.instagram.length > 0) {
                        popup = popup + "<a href='"+data.instagram+"' target='_blank'><img src='static/instagram.png' style='float: left; width: 32px; margin-top: 0px; border-radius: 10px; margin-right: 10px'/></a>";
                    }     
                    if (data.facebook && data.facebook.length > 0) {
                        popup = popup + "<a href='"+data.facebook+"' target='_blank'><img src='static/facebook.png' style='float: left; width: 32px; margin-top: 0px; border-radius: 10px; margin-right: 10px'/></a>";
                    }                                                                       
                    popup = popup + "</div>";

                return popup;
            }
            
            function hideOverlay() {
                $("#overlay").fadeOut(1400);
            }

            $("#imdb-rating a").on("click", function() {
                filters.imdb = parseInt($(this).attr("title"));
                $("#imdb-rating a").each(function() {
                    if (parseInt($(this).attr("title")) <= filters.imdb) {
                        $(this).addClass("on");
                        $(this).removeClass("off");
                    } else {
                        $(this).addClass("off");
                        $(this).removeClass("on");
                    }
                    $("#imdb-rating small strong").html(filters.imdb);
                });
                hidePieChart();
                lastNode = null;
                netChart.updateStyle();
            });
            
            $("#sort a").click(function(ev) {
                if ($(this).attr("rel") == "default") {
                    $("#sort a[rel=\"default\"]").attr("class", "on");
                    $("#sort a[rel=\"imdb\"]").attr("class", "off");
                    sortMode = "default";
                } else {
                    $("#sort a[rel=\"default\"]").attr("class", "off");
                    $("#sort a[rel=\"imdb\"]").attr("class", "on");
                    sortMode = "imdb";
                }
                netChart.updateStyle();
            });
            
            function updateHistory() {
                historyFrom = historySlider.rangeSlider("min");
                filters.yearFrom = Math.round(historyFrom);
                historyTo = historySlider.rangeSlider("max");
                filters.yearTo = Math.round(historyTo);
                netChart.updateFilters();
                netChart.updateStyle();
                $("#yearFrom").html(filters.yearFrom);
                $("#yearTo").html(filters.yearTo);
            }

            function getPieChartDimensions(node) {
                var dimensions = netChart.getNodeDimensions(node);
                var output = {
                    area: {
                        left: dimensions.x - dimensions.radius * 5,
                        top: dimensions.y - dimensions.radius * 5,
                        width: dimensions.radius * 10,
                        height: dimensions.radius * 10
                    },
                    pie: {
                        radius: dimensions.radius + (dimensions.radius / 2),
                        innerRadius: dimensions.radius
                    }
                };
                return output;
            }

            function hidePieChart() {
                pieChart.updateSettings({ area: { left: -100, top: -100, width: 0, height: 0 } });
                pieChartSettings = null;
                pieChartNode = null;
                activeSlice = null;
            }
            
            function netChartDClick(event) {                
                hidePieChart();
                if (event.clickNode) {
                    netChart.clearFocus();
                    netChart.addFocusNode(event.clickNode);
                }
            }

            function updatePieChart() {                
                
                var selectedNodes = netChart.selection();
                if (selectedNodes.length === 0) {
                    hidePieChart();
                    return;
                }

                //console.log('selectedNodes:', selectedNodes)

                var currentNode = selectedNodes[0];
                if (currentNode.focused) {
                    pieChartData = getPieData(currentNode.data);
                    if (currentNode === pieChartNode) {
                        return;
                    }
                    pieChartNode = currentNode;
                    pieChartSettings = getPieChartDimensions(currentNode);
                    pieChartSettings.data = { preloaded: { subvalues: pieChartData } };
                    pieChartSettings.navigation = {}; // required so that PieChart drilldown level is reset.
                    pieChart.updateSettings(pieChartSettings);
                    activeNode = currentNode;
                } else {
                    hidePieChart();
                    netChart.addFocusNode(currentNode);
                }
            }

            function getPieData(data) {
                var values = [];
                if (data.categories) {
                    for (var cat in data.categories) {
                        var count = data.categories[cat];
                        var params = {
                            id: cat,
                            value: count,
                            style: {
                                label: {
                                    text: cat
                                }
                            }
                        };
                        values.push(params);
                    }
                } else if (data.genre) {
                    for (var i in data.genre) {
                        var params = {
                            id: data.genre[i],
                            value: 1,
                            style: {
                                label: {
                                    text: data.genre[i]
                                }
                            }
                        };
                        values.push(params);
                    }
                }
                return values;
            }

            function movePieChart() {
                var selectedNodes = netChart.selection();
                if (selectedNodes.length === 0) {
                    return;
                }
                var currentNode = selectedNodes[0];
                if (currentNode.focused && pieChartSettings != null && currentNode == activeNode) {
                    var settings = getPieChartDimensions(currentNode);
                    var currentArea = settings.area;
                    if (pieChartSettings
                            && pieChartSettings.area.left === currentArea.left
                            && pieChartSettings.area.top === currentArea.top
                            && pieChartSettings.pie.radius === settings.pie.radius) {
                        return;
                    }
                    pieChartSettings = settings;
                    pieChart.updateSettings(settings);
                } else {
                    hidePieChart();
                }
            }

            var netChart = new NetChart({
                container: $("#demo")[0],
                data: {
                    preloadNodeLinks: true,
                    dataFunction: function(nodes, success, error) {

                        if (PRINT_DATA_RECEIVED) console.log('Llamada:', nodes);

                        var printData = function(data) {
                            if (PRINT_DATA_RECEIVED) console.log('Datos:', data);                                                                                                             
                            success(data);
                        };

                        // jQuery.ajax({
                        //     type: "GET",
                        //     url: "https://cpapi.zoomcharts.com/moviedb/api",
                        //     data: {method: "load", id: nodes.join(",")},
                        //     //success: success,
                        //     success: printData,
                        //     error: error
                        // });

                        axios.post(vm.$store.state.URL_NODE_SERVER+`/getNodes`, 
                            { method: "load", ids: nodes.join(",") },
                            { headers : {'Authorization': 'Bearer ' + vm.token }})
                            .then(response => {
                                printData(response.data)
                            })
                            .catch(e => {
                                vm.$localStorage.remove('bubblesToken')
                                vm.$localStorage.remove('bubblesUser')
                                vm.$localStorage.remove('bubblesImg')                                  
                                vm.$store.commit('loginKO')                
                                vm.$router.push('/') 
                            }) 

                    }
                },
                area: {
                    paddingTop: 100,
                    paddingLeft: 40,
                    paddingRight: 40,
                    paddingBottom: 40
                },
                navigation: {
                    mode: "focusnodes",
                    initialNodes: [],
                    focusNodeExpansionRadius: vm.nivel,       //Blas -> Determina el nivel del árbol que aparecerá enlazado
                    focusNodeTailExpansionRadius: 0.3,
                    numberOfFocusNodes: 10
                },
                toolbar: {
                    enabled: true
                },
                style: {
                    nodeDetailMinSize: 20,
                    nodeDetailMinZoom: 0.00001,
                    nodeRadiusExtent: [10, 150],
                    nodeAutoScaling: "none", // "linear" | "logarithmic" | "square"
                    node: {fillColor: null},
                    //Blas -Color del enlace ----
                    //link: {fillColor: "#09c"},
                    //link: {fillColor: "#fff"},
                    //link: {fillColor: "#30aaa2"},
                    link: {fillColor: "#175A79"},
                    //---------------------------
                    nodeHovered: {fillColor: undefined, shadowBlur: 0, shadowColor: "pink"},
                    linkHovered: {shadowBlur: 0, shadowColor: "pink"},
                    nodeLabel: {
                        scaleWithZoom: true, 
                        aspectRatio: 5, 
                        textStyle: {
                            fillColor: "black", 
                            font: "8px Arial"
                        }, 
                        backgroundStyle: {
                            fillColor: "#eee", 
                            lineWidth: 6, 
                            lineColor: "#eee"
                        }
                    },
                    hiddenLinks: {lineColor: "gray", lineWidth: 2, size: 6},
                    selection: {fillColor: null, sizeConstant: 5, sizeProportional: 0.1},
                    removedColor: "#333",
                    nodeStyleFunction: function(node) {
                        node = nodeRadius(node);
                        node = nodeStyle(node);
                    },
                    linkStyleFunction: function(link) {
                        link.relevance = Math.min(link.from.relevance, link.to.relevance);
                    }
                },
                interaction: {
                    resizing: {
                        enabled: false
                    },
                    selection: {
                        lockNodesOnMove: false
                    },
                    zooming: vm.zooming
                },
                layout: {
                    nodeSpacing: 9,
                    aspectRatio: false
                },
                nodeMenu: {
                    enabled: true,
                    showData: false,
                    contentsFunction: nodeMenu
                },
                events: {
                    onDoubleClick: netChartDClick,
                    onClick: updatePieChart,
                    onPositionChange: movePieChart
                },
                auras: {
                    enabled: true,
                    cellSize: 8,
                    overlap: true,
                    style: {

                        "Empresarial": {
                            fillColor: "#9E31A9"
                        },
                        "Institucional": {
                            fillColor: "#00BCD1"
                        },
                        "Social": {
                            fillColor: "#79C588"
                        },
                        "Otras": {
                            fillColor: "#494E6B"
                        }

                        // "Empresarial": {
                        //     fillColor: "rgba(47,195,47,0.3)"
                        // },
                        // "Institucional": {
                        //     fillColor: "rgba(234,180,4,0.3)"
                        // },
                        // "Social": {
                        //     fillColor: "rgba(176,220,11,0.3)"
                        // },
                        // "Otras": {
                        //     fillColor: "rgba(236,46,46,0.3)"
                        // }

                        // "Crime": {
                        //     fillColor: "rgba(47,195,47,0.3)"
                        // },
                        // "Documentary": {
                        //     fillColor: "rgba(234,180,4,0.3)"
                        // },
                        // "Comedy": {
                        //     fillColor: "rgba(176,220,11,0.3)"
                        // },
                        // "Drama": {
                        //     fillColor: "rgba(111,82,184,0.3)"
                        // },
                        // "Biography": {
                        //     fillColor: "rgba(236,46,46,0.3)"
                        // },
                        // "Short": {
                        //     fillColor: "rgba(213,66,155,0.3)"
                        // },
                        // "Romance": {
                        //     fillColor: "rgba(222,103,44,0.3)"
                        // },
                        // "Action": {
                        //     fillColor: "rgba(28,124,213,0.3)"
                        // },
                        // "Western": {
                        //     fillColor: "rgba(86,185,247,0.3)"
                        // },
                        // "Fantasy": {
                        //     fillColor: "rgba(10,232,235,0.3)"
                        // }
                    }
                }
            });

            var pieChart = new PieChart({
                parentChart: netChart,
                data: {
                    preloaded: {
                        subvalues: [],
                        sortField: "value"
                    }
                },
                labels: {
                    enabled: false
                },
                icons: {
                    sizeExtent: [8, 30]
                },
                pie: {
                    adaptiveRadius: false,
                    styleFunction: function(pie) {
                        if (pie.parentSlice) {                            
                            pie.sliceColors = [pie.parentSlice.fillColor];
                            pie.colorDistribution = "gradient";
                        }
                    }
                },
                slice: {
                    backgroundStyle: {
                        fillColor: "rgba(0xe2, 0xe2, 0xe2, 0.6)",
                        fillColor2: "rgba(0xe0, 0xe0, 0xe0, 0.6)"
                    },
                    connectorStyle: {lineColor: "#aaa"},
                    style: {
                        label: {
                            textStyle: {font: "14px arial"},
                            backgroundStyle: {fillColor: "rgba(220,220,220,0.6)"}
                        }
                    }
                },
                interaction: {
                    resizing: {
                        enabled: false
                    },
                    others: {
                        minSliceFraction: 0.03
                    }
                },
                events: {
                    onSelectionChange: pieChartSelection
                }
            });
            
            function pieChartSelection(event){
                if (event.selection.length > 0){
                    activeSlice = event.selection[0];
                } else {
                    if (event.pie.parentSlice){
                        activeSlice = event.pie.parentSlice;
                    } else {
                        activeSlice = null;
                    }
                }
                netChart.updateSettings({style:{nodeStyleFunction: function(node){ nodeRadius(node); nodeStyle(node); }}});
            }
            
            var sortMode = "";  // Blas -> original = "imdb"
            var searchText = null;
            var searchIds = [];
            var starString = String.fromCharCode(9733);
            var activeNode = null;
            var lastNode = null;
            var pieChartData = null;
            var pieChartSettings = null;
            var pieChartNode = null;
            var netChartNode = null;
            var activeSlice = null;
            var historyFrom = 1900;
            var historyTo = 2018;
            var year = 0;
                        
            var filters = {
                timeStart: new Date().getTime() - 365 * 86400 * 1000,
                timeEnd: new Date().getTime(),
                imdb: 5, //Relevancia
                yearFrom: historyFrom,
                yearTo: historyTo
            };
            var rangeSliderParams = {
                arrows: false,
                bounds: {
                    min: historyFrom,
                    max: historyTo
                },
                defaultValues: {
                    min: filters.yearFrom,
                    max: filters.yearTo
                }
            };
            
            search();
            hideOverlay();

            var historySlider = $("#years").rangeSlider(rangeSliderParams);
            $("#years").bind("valuesChanging", updateHistory);
            $(".DVSL-Menu").draggable();
                
            if (window.location.href.indexOf("headless") > -1) {
                $("body").addClass("embed");
            } else {
                $("body").addClass("standalone");
            }
        },

        clearSearch(){
            let c = document.getElementById('search')
            c.click()           
            this.$store.commit('clearSearch');    
        } 
        
    },

    mounted(){

        this.token = this.$localStorage.get('bubblesToken')

        this.init();               
    },

    computed: {
        search: {
            get () {
                return this.$store.getters.getSearch
            },
            set(){
                this.$store.state.search = $("#q").val()
            }
        }
    }    
}

</script>


<style scoped>
    .container {
        -webkit-box-flex: 1 !important;
        -ms-flex: 1 1 100% !important;
        flex: 1 1 100% !important;
        margin: auto !important;
        padding: 16px !important;
        padding-top: 0px !important;
        width: 100% !important;
    }
    ::-webkit-scrollbar {
        width: 12px !important;
    }
    
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3) !important; 
        border-radius: 10px !important;
    }
    
    ::-webkit-scrollbar-thumb {
        border-radius: 10px !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5) !important; 
    }
 
    .scrollform {
        overflow-y: scroll !important
    }    
</style>
