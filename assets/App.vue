<template>
  <v-app :class="fondo">

    <v-toolbar fixed app :clipped-left="clipped">
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <!-- <v-toolbar-title v-text="title"></v-toolbar-title> -->
      <v-toolbar-title>        
        <img style="width: 150px; margin-top: 7px" src="/static/logo_aunna.png" alt="AUNNAIT">        
      </v-toolbar-title>

      <!-- Opciones de la derecha -->
      <v-spacer></v-spacer>

      <v-tooltip left>
      <v-btn slot="activator" icon router to="/Redes">
        <v-icon>share</v-icon>
      </v-btn>
      <span>BUBBLES</span>
      </v-tooltip>

      <v-tooltip left>
      <v-btn slot="activator" icon router to="/Datos">
        <v-icon>view_list</v-icon>
      </v-btn>
      <span>GESTIÓN DE NODOS</span>
      </v-tooltip>

      <v-tooltip left>
      <v-btn slot="activator" icon router to="/Links">
        <v-icon>link</v-icon>
      </v-btn>
      <span>RELACIONES</span>
      </v-tooltip>
      
      <!-- <v-btn icon router to="/Welcome">
        <v-icon>info</v-icon>
      </v-btn> -->

      <!-- <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>       -->

      <!-- SETTINGS -->
      <div class="text-xs-center" style="z-index: 999 !important">
          <v-menu
            :close-on-content-click="false"
            :nudge-width="200"
            v-model="menu">
            <v-btn icon slot="activator">
              <v-icon>settings</v-icon>
            </v-btn>
            <v-card>
              <v-list>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <!-- <img src="/static/perfil.jpg" alt="Blas"> -->
                    <img :src="userImg" alt="">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{username}}</v-list-tile-title>
                    <v-list-tile-sub-title>Welcome to Bubbles</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
              <v-divider></v-divider>
              <v-list>
                <v-list-tile @click="changeFondo('desktop_verde')">
                  <v-list-tile-action>
                    <img src="/static/fondo_verde.png" style="width: 40px; margin-right: 20px" alt="">
                  </v-list-tile-action>
                  <v-list-tile-title>Fondo verde</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="changeFondo('desktop_azul')">
                  <v-list-tile-action>
                    <img src="/static/fondo_azul.png" style="width: 40px; margin-right: 20px" alt="">
                  </v-list-tile-action>
                  <v-list-tile-title>Fondo azul</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="changeFondo('desktop_rojo')">
                  <v-list-tile-action>
                    <img src="/static/fondo_rojo.png" style="width: 40px; margin-right: 20px" alt="">
                  </v-list-tile-action>
                  <v-list-tile-title>Fondo rojo</v-list-tile-title>
                </v-list-tile>          
              </v-list>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="menu = false">Cerrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
      </div>
     
      <v-menu bottom left>
        <v-btn icon slot="activator" dark>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile>
            <v-list-tile-title @click="logOut" style="cursor: pointer">
              <i class="material-icons" style="float: left;margin-right: 5px;">exit_to_app</i> Cerrar sesión
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

    </v-toolbar>
     
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>

    <!-- LOGIN -->
    <template>
      <v-layout row justify-center>
        <v-dialog v-model="login" 
          fullscreen 
          transition="dialog-bottom-transition" 
          :overlay="false">      

          <canvas class="canvas fondo"></canvas>

          <v-card style="z-index: 500; background: transparent">

              <v-flex d-flex 
                style="position: absolute;
                width: 305px;
                right: 220px;
                bottom: 100px;">

                <div id="text">
                <!-- content generated with JS -->  
                </div>

            <!-- <span style="position: absolute;
              top: -100px;
              font-size: 77px;
              text-shadow: rgba(255, 255, 255, 0.5) 0px 3px 33px;
              color: #ffffff8f;">
              Bubbles
            </span> -->

                <v-card dark class="widget-title fadeIn" style="border-radius: 10px">
                  <v-card-text>

                  <v-form 
                    v-model="valid" ref="form" 
                    lazy-validation>

                    <v-text-field
                      name="email"
                      label="Email"
                      v-model="email"
                      required
                      style="color: white"
                    ></v-text-field>

                    <v-text-field
                      type="password"
                      name="password"
                      label="Password"
                      v-model="password"
                      required
                    ></v-text-field>

                    <v-btn
                      style="width: 100%; margin: 0px; background: white; color: grey; margin-bottom: 5px"
                      @click="autenticate"
                      :disabled="!valid">
                      Login
                    </v-btn>

                  </v-form>

                  </v-card-text>
                </v-card>

              </v-flex>  

          </v-card>          


        <v-snackbar
          :timeout="timeout"
          color="error"      
          v-model="toInvalid">
          {{errorText}}
          <v-btn dark flat @click.native="toInvalid = false">Cerrar</v-btn>
        </v-snackbar>

        </v-dialog>  
      </v-layout>
    </template>

    <v-footer :fixed="fixed" app>
      <!-- <span>bmsoftware &copy; 2018</span> -->
      <v-spacer></v-spacer>
      <!-- <span>bmsoftware &copy; 2018</span> -->
    </v-footer>

  </v-app>
</template>

<script>

import Meta from "mixins/meta"
import axios from 'axios'
import sha256 from 'sha256'

export default {
  mixins: [Meta],

  data() {
    return { 
      login: null,     
      username: '',  
      userImg: '',  
      email: 'admin@aunnait.es',
      password: null,
      clipped: false,
      drawer: true,
      fixed: false,
      right: true,
      rightDrawer: false,
      //fondo: "desktop_verde",
      fondo: "desktop_azul",
      //fondo: "desktop_dev",
      menu: false,
      valid: false,  
      toInvalid: false,
      timeout: 3000,
      errorText: ''
    };
  },

  mounted (){

    this.controlLogin()

    $('.canvas').particles({
      maxParticles: 100,
      size: 5,
      speed: 0.3,
      color: '#ffffff',
      minDist: 140,
      connectParticles: true
    });  

    this.loadNameApp()  

  },  

  watch: {
    '$route': 'controlLogin'
  },

  methods: {

    controlLogin(){
      let token = this.$localStorage.get('bubblesToken')
      //Si existe el token entonces estoy autenticado
      if ((token) && (token !== null) && (token !== 'undefined')){
        this.login = false
        this.$store.commit('loginOK')       
        if ((this.$route.path === '/Login') || (this.$route.path === '/')) this.$router.push('Redes')       
        this.username = this.$localStorage.get('bubblesUser')    
        this.userImg = this.$localStorage.get('bubblesImg')   
      }else {      
        this.login = this.$store.state.login  
        this.username = this.$localStorage.get('bubblesUser')    
        this.userImg = this.$localStorage.get('bubblesImg')   
      } 
    },

    changeFondo(fondo) {
      switch (fondo) {
        case 'desktop_verde':
          this.$store.state.fondoDialog = 'fondoDialogVerde'
          break;
        case 'desktop_rojo':
          this.$store.state.fondoDialog = 'fondoDialogRojo'
          break;      
        default:
          this.$store.state.fondoDialog = 'fondoDialogAzul'
          break;
      }
      this.fondo = fondo;
    },

    autenticate(){      
      let password = sha256(this.password)
      //console.log('sha password:',password)
      axios.post(this.$store.state.URL_NODE_SERVER+'/authenticate', { email: this.email, password: password } )
        .then(response => {
          //console.log('Authenticate:',response.data);    
          if (response.data.success){
            this.$localStorage.set('bubblesToken', response.data.token)
            this.$localStorage.set('bubblesUser', response.data.user.username)
            this.$localStorage.set('bubblesImg', response.data.user.image)
            this.$store.commit('loginOK')   
            this.login = !this.login  
            this.$router.push('Redes')  
          }else {
            this.errorText = 'Email o contraseña incorrectos'
            this.toInvalid = true
          }                             
        }).catch(e => {
          this.errorText = 'Email o contraseña incorrectos'
          this.toInvalid = true
          //console.log(e)
        }) 
    },

    logOut(){
      this.$localStorage.remove('bubblesToken')
      this.$localStorage.remove('bubblesUser')
      this.$localStorage.remove('bubblesImg')
      this.$store.commit('loginKO')
      this.login = !this.login  
      this.$router.push('/')
    },
    
    loadNameApp(){

      // type anything here
      const text = 'Bubbles';

      // this function turns a string into an array
      const createLetterArray = (string) => {
        return string.split('');
      }

      // this function creates letter layers wrapped in span tags
      const createLetterLayers = (array) => {
        return array.map((letter) => {
            let layer = '';
            //specify # of layers per letter
            for (let i = 1; i <= 2; i++) {
              // if letter is a space
              if(letter == ' '){
                layer += '<span class="space"></span>';
              }else{
                layer += '<span class="letter-'+i+'">'+letter+'</span>';
              }
            }
            return layer;
        });
      }

      // this function wraps each letter in a parent container
      const createLetterContainers = (array) => {
        return array.map((item) => {
          let container = '';
          container += '<div class="wrapper">'+item+'</div>';
          return container;
        });
      }

      // use a promise to output text layers into DOM first
      const outputLayers = new Promise(function(resolve, reject) {
            document.getElementById('text').innerHTML = createLetterContainers(createLetterLayers(createLetterArray(text))).join('');
            resolve();
      });

      // then adjust width and height of each letter
      //const spans = Array.prototype.slice.call(document.getElementsByTagName('span'));
      const spans = Array.prototype.slice.call(document.getElementsByClassName('letter-1'));      
      outputLayers.then(() => {
          return spans.map((span) => {
            setTimeout(() => {
              span.parentElement.style.width = span.offsetWidth+'px';
              span.parentElement.style.height = span.offsetHeight+'px';
            }, 250);
          });  
      }).then(() => {
          // then slide letters into view one at a time
          let time = 250;
          return spans.map((span) => {
            time += 75;
            setTimeout(() => {
              span.parentElement.style.top = '0px';
            }, time);
          });
      });
            
    }
  }

};
</script>

<style>
  body {
    -webkit-font-smoothing: subpixel-antialiased !important;
    font-family: "Lato", "Helvetica Neue", "Segoe UI", sans-serif !important;  
    height: 100% !important;
    overflow-wrap: break-word !important;
    text-rendering: optimizeLegibility !important;
    word-wrap: break-word !important;
  }
  .theme--light .toolbar,
  .application .theme--light.toolbar {
    background-color: transparent !important;
    color: #ffffff !important;
  }
  .theme--light .footer,
  .application .theme--light.footer {
    background: transparent !important;
    color: #ffffff !important;
  }
  .btn .btn__content .icon {
    color: white !important;
  }
  .toolbar {
    position: relative !important;
    -webkit-transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
    width: 100% !important;
    will-change: inherit;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
  }
  .fondo-transparente {
    background: transparent !important;
  }

  /* FONDOS DE LA APLICACIÓN */
  .desktop_dev {
    background: #b4b1b1 !important;
    background-attachment: fixed !important;
    background-size: cover !important;
    min-width: 960px !important;
  }
  .desktop_verde {
    background-image: url("/static/fondo_verde.png") !important;
    background-attachment: fixed !important;
    background-size: cover !important;
    min-width: 960px !important;
  }
  .fondoDialogVerde{
      background-image: url(/static/fondo_verde.png) !important;
      background-attachment: fixed !important;
      background-size: cover !important;
  }
  .desktop_rojo {
    background-image: url("/static/fondo_rojo.png") !important;
    background-attachment: fixed !important;
    background-size: cover !important;
    min-width: 960px !important;
  }
  .fondoDialogRojo{
      background-image: url(/static/fondo_rojo.png) !important;
      background-attachment: fixed !important;
      background-size: cover !important;
  }
  .desktop_azul {
    background-image: url("/static/fondo_azul.png") !important;
    background-attachment: fixed !important;
    background-size: cover !important;
    min-width: 960px !important;
  }
  .fondoDialogAzul{
      background-image: url(/static/fondo_azul.png) !important;
      background-attachment: fixed !important;
      background-size: cover !important;
  }

  .widget-title {
    background-attachment: fixed !important;
    background-size: cover !important;
    background-color: rgba(255, 255, 255, 0.2) !important;
    color: white !important;
  }
  .content {
      -webkit-box-flex: 1 !important;
      -ms-flex: 1 1 auto !important;
      flex: 1 1 auto !important;
      max-width: 100% !important;
      -webkit-transition: 0.2s padding cubic-bezier(0.4, 0, 0.2, 1) !important;
      transition: 0.2s padding cubic-bezier(0.4, 0, 0.2, 1) !important;
      will-change: padding !important;
      padding: 0px !important;
  }
  .container {
      -webkit-box-flex: 1 !important;
      -ms-flex: 1 1 100% !important;
      flex: 1 1 100% !important;
      margin: auto !important;
      padding: 16px !important;
      padding-top: 0px !important;
      width: 100% !important;
  }

  .fondo {
    position: absolute !important;
    z-index: 100 !important;
    background: url(/static/fondo.jpg) no-repeat center center fixed !important; 
    -webkit-background-size: cover !important;
    -moz-background-size: cover !important;
    -o-background-size: cover !important;
    background-size: cover !important;
  }

  .theme--light .input-group:not(.input-group--error) label, .application .theme--light.input-group:not(.input-group--error) label {
      color: white !important;
  }

  .dialog--fullscreen {
      margin: 0;
      height: 100%;
      position: fixed;
      overflow-x: hidden !important;
      overflow-y: hidden !important;
      top: 0;
      left: 0;
  }


  /* CSS del nombre de la App en login */
  #text {  
    width: 305px;
    text-shadow: rgba(255, 255, 255, 0.5) 0px 3px 20px;
    color: #ffffff5c;
    font-style: oblique;
    letter-spacing: 3px;
    font-family: 'Fredoka One', sans-serif;
    font-size: 3em;
    line-height: 1em;
    text-align: center;
    position: absolute;
    top: -40px;
    transform: translateY(-50%);
  }

  #text:hover {
    cursor: default;
  }
  
  .wrapper {
    display: inline-block;
    top: -900px;
    position: relative;
    height: 150px; /* default */
    width: 20px; /* default */
    transition: ease 0.5s all;
  }

  .wrapper span {
      position: absolute;
      top:0;
      right:0;
      transition: ease 0.5s all;
  }
      
  .space {
    padding: 0;
    min-width: 30px;
    display: inline-block;
  }

</style>
