<template>

<div>

  <v-layout row wrap align-start mx-auto> 

    <!-- LISTADO DE CAMPEONATOS -->
    <v-flex d-flex xs12 md6 lg6 style="padding: 5px">
      <v-card class="widget-title fadeIn" >
        <v-toolbar dark style="height: 100px; background: transparent; z-index: 1000">
          <v-toolbar-title class="texto">
            Campeonatos
            <v-tooltip right>
            <v-btn v-if="admin" slot="activator" icon @click="openDialogAddCampeonato">
              <v-icon>playlist_add</v-icon>
            </v-btn>
            <span>Añadir campeonato</span>
            </v-tooltip>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn 
            v-show="view_search" icon 
            @click="search = '' , view_search = !view_search">
            <v-icon style="font-size: 15px">close</v-icon>
          </v-btn>          
          <v-text-field
            autofocus
            v-if="view_search"
            v-model="search"
            style="min-width: 100px"
          ></v-text-field>
          <v-btn icon @click="view_search = !view_search">
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <div style="position: absolute;
          right: 10px;
          left: 10px;
          top: 60px;">

          <v-data-table
            rows-per-page-text="Filas por página"
            :rows-per-page-items="rows_per_page"
            :headers="headers"
            :items="filterCampeonatos"
            :search="search"
            style="
          border-radius: 3px">
            <template slot="items" slot-scope="props">
              <td style="padding-top: 5px; padding-bottom: 5px; cursor: pointer" @click="editCampeonato(props.item)">
                <v-avatar
                  size='30'
                  class="grey lighten-4">
                    <img v-if="props.item.image" 
                      :src="props.item.image" alt="" 
                      style="width: 50px; height: 50px">
                </v-avatar>
              </td>
              <td style="cursor: pointer" @click="editCampeonato(props.item)">{{ props.item.name }}</td>
              <td>
                <v-tooltip left>
                <v-btn v-if="admin" slot="activator" small color="white" icon @click="goToChart(props.item.name)">
                  <v-icon color="green lighten-2" style="font-size: 20px; color: #81c784 !important">device_hub</v-icon>
                </v-btn>       
                <span>Mostrar cuadrante</span>
                </v-tooltip>    
                <v-tooltip left>     
                <v-btn v-if="admin" slot="activator" small color="white" icon @click="openDialog2(props.item)">
                  <v-icon style="color: grey !important; font-size: 20px">delete_sweep</v-icon>
                </v-btn>
                <span>Eliminar campeonato</span>
                </v-tooltip>
              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="cyan" icon="warning">
              La búsqueda de "{{ search }}" no ha obtenido resultados.
            </v-alert>
          </v-data-table>

        </div>
      </v-card>        
    </v-flex>  

    <!-- LISTADO DE PARTICIPANTES -->
    <v-flex d-flex xs12 md6 lg6 style="padding: 5px">
      <v-card class="widget-title fadeIn" >
        <v-toolbar dark style="height: 100px; background: transparent">
          <v-toolbar-title class="texto">
            Participantes
            <v-tooltip right>
            <v-btn v-if="admin" slot="activator" icon @click="openDialogAddParticipante">
              <v-icon>playlist_add</v-icon>
            </v-btn>
            <span>Añadir participante</span>
            </v-tooltip>            
            </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn 
            v-show="view_search_person" icon 
            @click="searchPerson = '' , view_search_person = !view_search_person">
            <v-icon style="font-size: 15px">close</v-icon>
          </v-btn>          
          <v-text-field
            autofocus
            v-if="view_search_person"
            v-model="searchPerson"
          ></v-text-field> 
          <v-btn icon @click="view_search_person = !view_search_person">
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <div style="position: absolute;
          right: 10px;
          left: 10px;
          top: 60px;">

          <v-data-table
            rows-per-page-text="Filas por página"
            :rows-per-page-items="rows_per_page"          
            :headers="headers2"
            :items="filterParticipantes"
            :search="searchPerson"
            style="
          border-radius: 3px"
            >
            <template slot="items" slot-scope="props">
              <td style="padding-top: 5px; padding-bottom: 5px; cursor: pointer" @click="editParticipante(props.item)">
                <v-avatar
                  size='30'
                  class="grey lighten-4">
                    <img v-if="props.item.image" 
                      :src="props.item.image" alt="" 
                      style="width: 50px; height: 50px">
                </v-avatar>
              </td>
              <td style="cursor: pointer" @click="editParticipante(props.item)">{{ props.item.username }}</td>
              <td style="cursor: pointer" @click="editParticipante(props.item)">{{ props.item.email }}</td>
              <td>
                <!-- <v-tooltip left>
                <v-btn slot="activator" small color="white" icon @click="goToChart(props.item.name)">
                  <v-icon style="color: purple !important; font-size: 20px">share</v-icon>
                </v-btn>   
                <span>Mostrar en bubbles</span>
                </v-tooltip> -->
                <v-tooltip left>             
                <v-btn v-if="admin" slot="activator" small color="white" icon @click="openDialog(props.item)">
                  <v-icon style="color: grey !important; font-size: 20px">delete_sweep</v-icon>
                </v-btn>
                <span>Eliminar participante</span>
                </v-tooltip>
              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="cyan" icon="warning">
              La búsqueda de "{{ searchPerson }}" no ha obtenido resultados.
            </v-alert>
          </v-data-table>

        </div>
      </v-card>        
    </v-flex>      

    <!-- MODAL PARA LA INSERCIÓN DE CAMPEONATOS -->
    <v-dialog v-model="dialogAddCampeonato" max-width="80%">
      <v-card dark :class="theme" class="scrollform" v-bind:style="{  'max-height': window_height + 'px' }">
        <v-card-title>
          <span class="headline">Datos del campeonato</span>
        </v-card-title>
        <v-card-text>
            
        <v-form v-model="valid" ref="form1" lazy-validation>          
            
          <v-layout row wrap align-start>

            <!-- Nombre -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Nombre" v-model="name" :rules="nameRules" :disabled="!admin" required></v-text-field>              
            </v-flex>
            
            <!-- Imagen -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Imagen" v-model="image" :rules="imageRules" :disabled="!admin" required></v-text-field>              
            </v-flex>

          </v-layout> 
        
          <v-btn v-if="admin"
            @click="saveCampeonato"
            color="light-green darken-4"
            :disabled="!valid" style="margin-top: 0px">
            Guardar
          </v-btn>
          <v-btn v-if="admin" @click.native="clear2" style="margin-top: 0px">Cancelar</v-btn>   

        </v-form>

        </v-card-text>     

      </v-card>
    </v-dialog>

    <!-- MODAL PARA LA INSERCIÓN  DE PARTICIPANTES-->
    <v-dialog v-model="dialogAddParticipante" max-width="80%">
      <v-card dark :class="theme" class="scrollform" v-bind:style="{  'max-height': window_height + 'px' }">
        <v-card-title>
          <span class="headline">Datos del participante</span>
        </v-card-title>
        <v-card-text>
            
        <v-form v-model="valid" ref="form2" lazy-validation>          
            
          <v-layout row wrap align-start>

            <!-- Nombre -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Nombre" v-model="username" :rules="nameRules" :disabled="!admin" required></v-text-field>              
            </v-flex>
            
            <!-- Imagen -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Imagen" v-model="image" :rules="imageRules" :disabled="!admin" required></v-text-field>              
            </v-flex>

          </v-layout> 

          <v-layout row wrap align-start>

            <!-- Email -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Correo electrónico" v-model="email" :rules="emailRules" :disabled="!admin" required></v-text-field> 
            </v-flex>

            <!-- Password -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px" v-if="admin || update_password">
              <v-text-field label="Contraseña" type="password" v-model="password" :rules="passwordRules" :disabled="!update_password" required></v-text-field> 
            </v-flex>

          </v-layout>      
        
          <v-btn v-if="admin"
            @click="saveParticipante"
            color="light-green darken-4"
            :disabled="!valid" style="margin-top: 0px">
            Guardar
          </v-btn>
          <v-btn v-if="admin" @click.native="clear" style="margin-top: 0px">Cancelar</v-btn>   

        </v-form>

        </v-card-text>     

      </v-card>
    </v-dialog>
  
    <v-snackbar
      style="background: rgb(69, 143, 84) !important"
      :timeout="timeout"  
      v-model="infoOperation">
      {{info}}
      <v-btn dark flat @click.native="infoOperation = false">Cerrar</v-btn>
    </v-snackbar>

    <!-- Botón para ir al gráfico -->
    <v-fab-transition>
      <v-btn
        router to="/Billar"
        dark
        fab
        fixed
        bottom
        right
        small
        style="background-color: rgba(255, 255, 255, 0.2)">
        <v-icon>device_hub</v-icon>
      </v-btn>
    </v-fab-transition>

  </v-layout>

  <!-- CONFIRMACIÓN DE BORRADO -->
  <v-dialog v-model="dialog" max-width="50%">
    <v-card>
      <v-card-title class="headline">¿Esta seguro de que desea borrar el participante seleccionado?</v-card-title>
      <v-card-text>Esta operación no podrá ser deshecha</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat="flat" @click="cancelDeleteNode()">Cancelar</v-btn>
        <v-btn color="red" flat="flat" @click="deleteParticipante()">Borrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>  

  <!-- CONFIRMACIÓN DE BORRADO -->
  <v-dialog v-model="dialog2" max-width="50%">
    <v-card>
      <v-card-title class="headline">¿Esta seguro de que desea borrar el campeonato seleccionado?</v-card-title>
      <v-card-text>Esta operación no podrá ser deshecha</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat="flat" @click="cancelDeleteNode()">Cancelar</v-btn>
        <v-btn color="red" flat="flat" @click="deleteCampeonato()">Borrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>  

</div>

</template>

<script>
  import axios from 'axios'
  import sha256 from 'sha256'
  export default {
    data: () => ({

      admin: null,
      update_password: false,
      window_height: 700,
      info: 'Datos guardados',
      infoOperation: false,
      timeout: 3000,
      valid: false,
      name: '',
      email: '',
      username: '',
      password: '',
      nameRules: [
        v => !!v || 'El nombre es obligatorio'
      ],
      passwordRules: [
        v => !!v || 'La contraseña es obligatoria'
      ],  
      emailRules: [
        v => !!v || 'El email es obligatorio'
      ],           
      tipo: null,
      tipos: [
        'Persona',
        'Institución u organismo'
      ],
      imageRules: [
        v => !!v || 'La imagen es obligatoria'
      ],
 
      image: '',

      form_height: 700,

      // DATOS DE LA TABLA
      search: '',
      view_search: false,
      searchPerson: '',     
      view_search_person: false,
      headers: [
        { text: '', align: 'left', sortable: false, value: 'image' },
        { text: 'Nombre', align: 'left', sortable: true, value: 'name' },
        { text: '', align: 'center', sortable: false }
      ],
      headers2: [
        { text: '', align: 'left', sortable: false, value: 'image' },
        { text: 'Nombre', align: 'left', sortable: true, value: 'username' },
        { text: 'Email', align: 'left', sortable: true, value: 'email' },
        { text: '', align: 'center', sortable: false }
      ],      
      rows_per_page: [10,15,25,50,{"text":"Todos","value":-1}],
      campeonatos: [],
      participantes: [],
      dialog: false,
      dialog2: false,
      participante_to_delete: null,
      campeonato_to_delete: null,

      num_instituciones: 0,
      num_personas: 0,
      num_conexiones: 0,

      dialogAddCampeonato: false,
      dialogAddParticipante: false,

      //EDICIÓN
      current_id_participante_to_update: null,
      current_id_campeonato_to_update: null,
      
      token: null,
      userID: null,
      teams: [],
      results: []
      
    }),

    mounted() {

      this.token = this.$localStorage.get('billarToken') 
      this.userID = this.$localStorage.get('billarUserID')

      this.admin = this.$store.state.admin

      //Ajuste al height del formularaio
      this.form_height = window.innerHeight - 230; 

      //Ajuste al height de la pantalla actual
      this.window_height = window.innerHeight - 150;        

      this.getCampeonatos()    
      this.getParticipantes()    

    },

    computed: {
      filterCampeonatos() {        
        return this.campeonatos.filter((i) => {
          return true       
        })
      },
      filterParticipantes() {        
        return this.participantes.filter((i) => {
          return true       
        })
      },
      theme(){
        return this.$store.state.fondoDialog
      }           
    },

    methods: {

      remove (item) {
        this.relaciones.splice(this.relaciones.indexOf(item), 1)
        this.relaciones = [...this.relaciones]
      },      

      editParticipante(participante){
        this.dialogAddParticipante = true
        this.current_id_participante_to_update = participante._id
        this.username = participante.username
        this.email = participante.email
        this.image = participante.image
        this.password = ''
        if (this.userID === participante._id) this.update_password = true
        else this.update_password = false
        
      },

      editCampeonato(campeonato){
        this.dialogAddCampeonato = true
        this.current_id_campeonato_to_update = campeonato._id
        this.name = campeonato.name
        this.image = campeonato.image
        this.teams = campeonato.teams
        this.results = campeonato.results
      },      

      openDialogAddParticipante(){        
        this.username = ''
        this.password = ''
        this.image = '/static/img/'
        this.dialogAddParticipante = true
        this.current_id_participante_to_update = null
      },

      openDialog(participante){
        this.dialog = true
        this.participante_to_delete = participante
      },

      openDialogAddCampeonato(){        
        this.name = ''
        this.image = '/static/img/bolas/'
        this.dialogAddCampeonato = true
        this.current_id_campeonato_to_update = null
      },      
      
      openDialog2(campeonato){
        this.dialog2 = true
        this.campeonato_to_delete = campeonato
      },

      getCampeonatos (){
        let vm = this;
        /* Obtención del campeonato activo o seleccionado */
        axios.get(vm.$store.state.URL_NODE_SERVER+'/getCampeonatos',
            { headers : {'Authorization': 'Bearer ' + vm.token }})
            .then(function (response) {
                //console.log(response.data);
                vm.campeonatos = response.data;
            })
            .catch(function (error) {
                vm.$localStorage.remove('billarToken')
                vm.$localStorage.remove('billarUser')
                vm.$localStorage.remove('billarImg')                                            
                vm.$router.push('/') 
            }); 
      },

      getParticipantes (){
        let vm = this;
        /* Obtención del campeonato activo o seleccionado */
        axios.get(vm.$store.state.URL_NODE_SERVER+'/getParticipantes',
            { headers : {'Authorization': 'Bearer ' + vm.token }})
            .then(function (response) {
                //console.log(response.data);
                vm.participantes = response.data;
            })
            .catch(function (error) {
                vm.$localStorage.remove('billarToken')
                vm.$localStorage.remove('billarUser')
                vm.$localStorage.remove('billarImg')                                            
                vm.$router.push('/') 
            }); 
      },

      saveParticipante () {
        if (this.$refs.form2.validate()) {          

          let vm = this
          let password = sha256(this.password)
          let participante = {
            username: vm.username,
            image: vm.image,
            password: password,
            email: vm.email
          }

          //=> Si es un alta entramos por aquí
          if (!vm.current_id_participante_to_update) {

              axios.post(vm.$store.state.URL_NODE_SERVER+`/addParticipante`, participante,
                { headers : {'Authorization': 'Bearer ' + vm.token }})
                .then(response => {
                    //console.log(response.data); 
                    vm.getParticipantes()
                    vm.dialogAddParticipante = false                                    
                }).catch(e => {console.log(e)}) 
        
          //=> Si es una modificación entramos por aquí        
          }else {

              participante._id = vm.current_id_participante_to_update
              axios.post(vm.$store.state.URL_NODE_SERVER+`/saveParticipante`, participante,
                { headers : {'Authorization': 'Bearer ' + vm.token }})
                .then(response => {
                    //console.log(response.data); 
                    vm.getParticipantes()
                    vm.dialogAddParticipante = false                                    
                }).catch(e => {console.log(e)}) 

          }
        
        }

      },

      saveCampeonato () {
        if (this.$refs.form1.validate()) {          

          let vm = this

          //=> Si es un alta entramos por aquí
          if (!this.current_id_campeonato_to_update) {

              let campeonato = {
                name: vm.name,
                image: vm.image,
                teams : [],
                results : []                
              }

              axios.post(vm.$store.state.URL_NODE_SERVER+`/addCampeonato`, campeonato,
                { headers : {'Authorization': 'Bearer ' + vm.token }})
                .then(response => {
                    //console.log(response.data); 
                    vm.getCampeonatos() 
                    vm.dialogAddCampeonato = false                                    
                }).catch(e => {console.log(e)}) 
        
          //=> Si es una modificación entramos por aquí        
          }else {

              let campeonato = {
                _id: vm.current_id_campeonato_to_update,
                name: vm.name,
                image: vm.image,
                teams : vm.teams,
                results : vm.results                
              }

              axios.post(vm.$store.state.URL_NODE_SERVER+`/saveCampeonato`, campeonato,
                  { headers : {'Authorization': 'Bearer ' + vm.token }})
                  .then(response => {
                      //console.log(response.data);
                      vm.getCampeonatos()   
                      vm.dialogAddCampeonato = false                                     
                  }).catch(e => {console.log(e)})

          }
        
        }

      },

      clear () {    
        this.dialogAddParticipante = false       
      },

      clear2 () {    
        this.dialogAddCampeonato = false       
      },

      deleteParticipante (){
        let vm = this
        this.dialog = false;
        axios.post(vm.$store.state.URL_NODE_SERVER+`/deleteParticipante`, vm.participante_to_delete,
          { headers : {'Authorization': 'Bearer ' + vm.token }})
          .then(response => {
            //console.log(response.data)
            vm.participante_to_delete = null
            vm.getParticipantes()
          }).catch(e => {
            console.log(e)
            vm.participante_to_delete = null
          }) 
      },

      deleteCampeonato (){
        let vm = this
        this.dialog2 = false;
        axios.post(vm.$store.state.URL_NODE_SERVER+`/deleteCampeonato`, vm.campeonato_to_delete,
          { headers : {'Authorization': 'Bearer ' + vm.token }})
          .then(response => {
            //console.log(response.data)
            vm.campeonato_to_delete = null
            vm.getCampeonatos()
          }).catch(e => {
            console.log(e)
            vm.campeonato_to_delete = null
          }) 
      },

      cancelDeleteNode (){
        this.participante_to_delete = null;
        this.campeonato_to_delete = null;
        this.dialog = false;
        this.dialog2 = false;
      },

      goToChart (name){
        this.$store.state.search = name
        this.$router.push('Billar')
      }

    }
  }
</script>

<style scoped>
  .texto {
    font-size: 17px !important; font-weight: normal !important;
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
