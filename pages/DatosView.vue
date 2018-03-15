<template>

<div>

  <!-- LÍNEA DE INFORMACIÓN SUPERIOR -->
  <v-layout row wrap align-start mx-auto mb-3> 

      <v-flex d-flex xs12 md6 lg4 style="padding: 5px">
        <v-card color="cyan" dark>
          <v-card-title primary class="title texto">
            <v-icon style="margin-right: 10px;">business</v-icon>
            Instituciones y organizaciones
            <v-spacer></v-spacer>
            <span>{{num_instituciones}}</span>            
          </v-card-title>
        </v-card>
      </v-flex> 

      <v-flex d-flex xs12 md6 lg4 style="padding: 5px">
        <v-card color="purple" dark>
          <v-card-title primary class="title texto">
            <v-icon style="margin-right: 10px;">supervisor_account</v-icon> 
            Personas
            <v-spacer></v-spacer>
            <span>{{num_personas}}</span>             
          </v-card-title>          
        </v-card>
      </v-flex> 

      <v-flex d-flex xs12 md6 lg4 style="padding: 5px">
        <v-card color="green lighten-2" dark router to="/Links">
          <v-card-title primary class="title texto">            
            <v-icon style="margin-right: 10px;">link</v-icon>            
            Conexiones
            <v-spacer></v-spacer>
            <span>{{num_conexiones}}</span>             
          </v-card-title>          
        </v-card>
      </v-flex> 

  </v-layout>

  <v-layout row wrap align-start mx-auto> 

    <!-- LISTADO DE INSTITUCIONES Y OGANIZACIONES -->
    <v-flex d-flex xs12 md4 lg4 style="padding: 5px">
      <v-card class="widget-title fadeIn" >
        <v-toolbar dark style="height: 100px; background: transparent">
          <v-toolbar-title class="texto">
            Instituciones y organizaciones
            <v-tooltip right>
            <v-btn slot="activator" icon @click="openDialogAddNodo">
              <v-icon>playlist_add</v-icon>
            </v-btn>
            <span>Añadir institución u organización</span>
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
            :items="filterInstituciones"
            :search="search"
            style="
          border-radius: 3px">
            <template slot="items" slot-scope="props">
              <td style="padding-top: 5px; padding-bottom: 5px; cursor: pointer" @click="editNode(props.item)">
                <v-avatar
                  size='30'
                  class="grey lighten-4">
                    <img v-if="props.item.image" 
                      :src="props.item.image" alt="" 
                      style="width: 50px; height: 50px">
                </v-avatar>
              </td>
              <td style="cursor: pointer" @click="editNode(props.item)">{{ props.item.name }}</td>
              <td>
                <v-tooltip left>
                <v-btn slot="activator" small color="white" icon @click="goToChart(props.item.name)">
                  <v-icon color="green lighten-2" style="font-size: 20px; color: #81c784 !important">share</v-icon>
                </v-btn>       
                <span>Mostrar en bubbles</span>
                </v-tooltip>    
                <v-tooltip left>     
                <v-btn slot="activator" small color="white" icon @click="openDialog(props.item)">
                  <v-icon style="color: grey !important; font-size: 20px">delete_sweep</v-icon>
                </v-btn>
                <span>Eliminar nodo</span>
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

    <!-- LISTADO DE PERSONAS -->
    <v-flex d-flex xs12 md4 lg4 style="padding: 5px">
      <v-card class="widget-title fadeIn" >
        <v-toolbar dark style="height: 100px; background: transparent">
          <v-toolbar-title class="texto">
            Personas
            <v-tooltip right>
            <v-btn slot="activator" icon @click="openDialogAddNodo">
              <v-icon>playlist_add</v-icon>
            </v-btn>
            <span>Añadir persona</span>
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
            :headers="headers"
            :items="filterPersonas"
            :search="searchPerson"
            style="
          border-radius: 3px"
            >
            <template slot="items" slot-scope="props">
              <td style="padding-top: 5px; padding-bottom: 5px; cursor: pointer" @click="editNode(props.item)">
                <v-avatar
                  size='30'
                  class="grey lighten-4">
                    <img v-if="props.item.image" 
                      :src="props.item.image" alt="" 
                      style="width: 50px; height: 50px">
                </v-avatar>
              </td>
              <td style="cursor: pointer" @click="editNode(props.item)">{{ props.item.name }}</td>
              <td>
                <v-tooltip left>
                <v-btn slot="activator" small color="white" icon @click="goToChart(props.item.name)">
                  <v-icon style="color: purple !important; font-size: 20px">share</v-icon>
                </v-btn>   
                <span>Mostrar en bubbles</span>
                </v-tooltip>
                <v-tooltip left>             
                <v-btn slot="activator" small color="white" icon @click="openDialog(props.item)">
                  <v-icon style="color: grey !important; font-size: 20px">delete_sweep</v-icon>
                </v-btn>
                <span>Eliminar nodo</span>
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

    <!-- FORMULARIO -->
    <v-flex d-flex xs12 md4 lg4 style="padding: 5px">
        <v-card dark class="widget-title scrollform fadeIn" 
          style="padding: 30px; padding-top: 22px;">

          <v-form v-model="valid" ref="form1" lazy-validation enctype="multipart/form-data">          
            
            <v-toolbar-title @click="openDialogAddNodo" class="texto" 
              style="margin: 0px; margin-bottom: 10px; cursor: pointer">Añadir nodo</v-toolbar-title>

            <!-- Tipo -->
            <v-select
              label="Tipo"
              v-model="tipo"
              :items="tipos"
              @change="openDialogAddNodo"
            ></v-select>

            <!-- Nombre --> 
            <v-text-field label="Nombre" @click="openDialogAddNodo" v-model="name"></v-text-field>

            <!-- imagen -->
            <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
              <!-- <img :src="imageUrl" height="150" v-if="imageUrl" style="max-width: 80%;"/> -->
              <v-text-field label="Seleccione una imagen"                           
                prepend-icon='camera_alt'
                disabled></v-text-field>
            </v-flex>

            <!-- Información -->
            <v-text-field label="Información" @click="openDialogAddNodo" v-model="biography" multi-line></v-text-field>        

            <!-- <v-btn
              @click="submit"
              :disabled="!valid">
              Guardar
            </v-btn>
            <v-btn @click="clear">Borrar</v-btn> -->

            <v-btn @click="openDialogAddNodo">Añadir</v-btn>

          </v-form>

        </v-card>      
    </v-flex>  

    <!-- MODAL PARA LA INSERCIÓN -->
    <v-dialog v-model="dialogAddNodo" max-width="80%">
      <v-card dark :class="theme" class="scrollform" v-bind:style="{  'max-height': window_height + 'px' }">
        <v-card-title>
          <span class="headline">Datos del nodo</span>
        </v-card-title>
        <v-card-text>

        <img :src="imageUrl" v-if="imageUrl" 
            style="max-width: 50%; max-height: 200px; position: absolute; right: 35px; top: 20px;"/>
            
        <v-form v-model="valid" ref="form2" lazy-validation>

          <v-layout row wrap align-start>

            <!-- Tipo -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-select
                label="Tipo"
                v-model="tipo"
                :items="tipos"
                :rules="[v => !!v || 'El tipo es requerido']"
                required          
              ></v-select>
            </v-flex>

          </v-layout>             
            
          <v-layout row wrap align-start>

            <!-- Nombre -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Nombre" v-model="name" :rules="nameRules" required></v-text-field>              
            </v-flex>
            
          </v-layout> 

          <v-layout row wrap align-start>

            <!-- Email -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Correo electrónico" v-model="email"></v-text-field> 
            </v-flex>

            <!-- Imagen -->
            <v-flex d-flex xs12 sm6 md6 
              class="text-xs-center text-sm-center text-md-center text-lg-center"
              style="padding: 20px; padding-top: 0px">              
              <v-text-field label="Seleccione una imagen" 
                @click='pickFile' 
                v-model='imageName' 
                :rules="imageRules"                            
                prepend-icon='camera_alt'
                required></v-text-field>
              <input
                id="file"
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked">
            </v-flex>

          </v-layout>      

          <v-layout row wrap align-start>
            <!-- Teléfono 1 -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Teléfono 1" v-model="phone"></v-text-field>     
            </v-flex>
            <!-- Teléfono 2 -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Teléfono 2" v-model="phone2"></v-text-field>
            </v-flex>
          </v-layout>  

          <v-layout row wrap align-start>
            <!-- Cargo -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Cargo" v-model="cargo"></v-text-field> 
            </v-flex>
            <!-- Web -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Web" v-model="web"></v-text-field>    
            </v-flex>            
          </v-layout>

          <v-layout row wrap align-start>
            <!-- Información -->
            <v-flex d-flex xs12 sm12 md12 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Información" v-model="biography" multi-line></v-text-field>              
            </v-flex>
          </v-layout>
            
          <v-layout row wrap align-start>
            <!-- Formación -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Formación" v-model="formacion" multi-line></v-text-field>      
            </v-flex>
            <!-- Experiencia -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Experiencia" v-model="experiencia" multi-line></v-text-field>   
            </v-flex>
          </v-layout>              
                        
          <v-layout row wrap align-start>
            <!-- Relaciones -->
            <v-flex d-flex xs12 sm12 md12 style="padding: 20px; padding-top: 0px">

            <v-select
              label="Otras relaciones"
              chips
              tags              
              dark
              prepend-icon="timeline"
              append-icon=""
              clearable
              v-model="relaciones">
              <template slot="selection" slot-scope="data">
                <v-chip
                  close
                  dark
                  outline color="white"
                  @input="remove(data.item)"
                  :selected="data.selected">
                  <strong>{{ data.item }}</strong>
                </v-chip>
              </template>
            </v-select>
             
            </v-flex>
          </v-layout>

          <v-layout row wrap align-start>
            <!-- Twitter -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Twitter" v-model="twitter"></v-text-field>       
            </v-flex>
            <!-- Linkedin -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Linkedin" v-model="linkedin"></v-text-field>    
            </v-flex>
          </v-layout>   

          <v-layout row wrap align-start>
            <!-- Youtube -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Youtube" v-model="youtube"></v-text-field>       
            </v-flex>
            <!-- Instagram -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Instagram" v-model="instagram"></v-text-field>    
            </v-flex>
          </v-layout> 

          <v-layout row wrap align-start>
            <!-- Facebook -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Facebook" v-model="facebook"></v-text-field>       
            </v-flex>     
            <!-- Remarcar nodo -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px" v-show="tipo === 'Institución u organismo'">                
              <v-select
                label="Remarcar nodo"
                v-model="remarcar"
                :items="remarcarItems"
                required          
              ></v-select>                  
            </v-flex>                   
          </v-layout>           

          <v-btn
            @click="submit"
            :disabled="!valid" style="margin-top: 30px">
            Guardar
          </v-btn>
          <v-btn @click.native="clear" style="margin-top: 30px">Cancelar</v-btn>          
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
        router to="/Redes"
        dark
        fab
        fixed
        bottom
        right
        small
        style="background-color: rgba(255, 255, 255, 0.2)">
        <v-icon>share</v-icon>
      </v-btn>
    </v-fab-transition>

  </v-layout>

  <!-- CONFIRMACIÓN DE BORRADO -->
  <v-dialog v-model="dialog" max-width="50%">
    <v-card>
      <v-card-title class="headline">¿Esta seguro de que desea borrar el contacto seleccionado?</v-card-title>
      <v-card-text>Esta operación no podrá ser deshecha</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat="flat" @click="cancelDeleteNode()">Cancelar</v-btn>
        <v-btn color="red" flat="flat" @click="deleteNode()">Borrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>  

</div>

</template>

<script>
  import axios from 'axios'
  export default {
    data: () => ({

      window_height: 700,
      info: 'Datos guardados',
      infoOperation: false,
      timeout: 3000,
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'El nombre es obligatorio'
      ],
      tipo: null,
      tipos: [
        'Persona',
        'Institución u organismo'
      ],
      imageRules: [
        v => !!v || 'La imagen es obligatoria'
      ],
 
      imageName: '',
      imageUrl: '',
      imageFile: '',
      biography: '',
      cargo: '',
      formacion: '',
      experiencia: '',
      relaciones: [],
      phone: '',
      phone2: '',
      email: '',
      twitter: '',
      linkedin: '',
      instagram: '',
      youtube: '',
      facebook: '',
      web: '',
      remarcar: 'No',
      remarcarItems: ['No', 'Si'],

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
      rows_per_page: [10,15,25,50,{"text":"Todos","value":-1}],
      nodos: [],
      dialog: false,
      node_to_delete: null,

      num_instituciones: 0,
      num_personas: 0,
      num_conexiones: 0,

      dialogAddNodo: false,

      //EDICIÓN DE NODOS
      current_id_node_to_update: null,
      
      token: null
      
    }),

    created () {  
  
    },

    mounted() {

      this.token = this.$localStorage.get('bubblesToken') 

      //Ajuste al height del formularaio
      this.form_height = window.innerHeight - 230; 

      //Ajuste al height de la pantalla actual
      this.window_height = window.innerHeight - 150;        

      this.loadNodesForTable()

      let vm = this;
      axios.get(this.$store.state.URL_NODE_SERVER+'/loadLinksForTable',
        { headers : {'Authorization': 'Bearer ' + vm.token }})
        .then(function (response) {
          vm.num_conexiones = response.data.length
        })
        .catch(function (error) {
            vm.$localStorage.remove('bubblesToken')
            vm.$localStorage.remove('bubblesUser')
            vm.$localStorage.remove('bubblesImg')            
            vm.$store.commit('loginKO')                
            vm.$router.push('/') 
        });       

    },

    computed: {
      filterInstituciones() {        
        return this.nodos.filter((i) => {
          if (i.type === 'movie'){
            this.num_instituciones++
            return true
          }else return false          
        })
      },
      filterPersonas() {        
        return this.nodos.filter((i) => {
          if (i.type === 'actor'){
            this.num_personas++
            return true
          }else return false          
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

      editNode(node){
        this.dialogAddNodo = true
        this.current_id_node_to_update = node._id

        if (node.type === 'actor'){
            this.tipo = this.tipos[0]
        }else this.tipo = this.tipos[1]

        let remarcar = 'No'
        if (node.remarcar) remarcar = 'Si'
        
        this.name = node.name
        this.imageName = node.image
        this.imageUrl = node.image
        this.imageFile = ''
        this.biography = node.biography
        this.cargo = node.cargo
        this.formacion = node.formacion
        this.experiencia = node.experiencia
        this.relaciones = node.relaciones
        this.phone = node.phone
        this.phone2 = node.phone2
        this.email = node.email
        this.twitter = node.twitter
        this.linkedin = node.linkedin
        this.instagram = node.instagram
        this.facebook = node.facebook
        this.youtube = node.youtube
        this.web = node.web
        this.remarcar = remarcar
      },

      openDialogAddNodo(){        
        this.name = ''
        this.imageName = ''
        this.imageUrl = null
        this.imageFile = ''
        this.biography = null
        this.cargo = null
        this.formacion = null
        this.experiencia = null
        this.relaciones = []
        this.phone = null
        this.phone2 = null
        this.email = null
        this.twitter = null
        this.linkedin = null
        this.instagram = null
        this.facebook = null
        this.youtube = null
        this.web = null
        this.remarcar = 'No'
        this.dialogAddNodo = true
        this.current_id_node_to_update = null
      },

      openDialog(node){
        this.dialog = true
        this.node_to_delete = node
      },
      
      loadNodesForTable (){
        let vm = this;
        axios.get(this.$store.state.URL_NODE_SERVER+'/loadNodesForTable',
          { headers : {'Authorization': 'Bearer ' + vm.token }})
          .then(function (response) {
            //console.log(response.data);
            vm.nodos = response.data
            if (vm.$store.state.edit_node) {
              let _id = vm.$store.state.edit_node
              vm.$store.commit('clearEditNode') 
              for (let index = 0; index < vm.nodos.length; index++) {
                const n = vm.nodos[index];
                if (n._id === _id) {
                  vm.editNode(n)
                  break;
                }
              }
            } 
          })
          .catch(function (error) {
            console.log(error);
          });
      },

      submit () {
        if (this.$refs.form2.validate()) {          

          let tipo = 'movie';
          if (this.tipo === 'Persona') tipo = 'actor';

          //=> Si es un alta entramos por aquí
          if (!this.current_id_node_to_update) {

            //Primero subimos la imagen y despues insertamos el nodo completo
            var data = new FormData();
            data.append('foo', 'bar');
            data.append('file', this.imageFile);
            var config = {
              onUploadProgress: function(progressEvent) {
                var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
              }
            };
            let vm = this;          
            axios.post(vm.$store.state.URL_NODE_SERVER+`/uploadImage`, data, config).then(function (res) {
              
              let remarcar = false
              if (vm.remarcar === 'Si') remarcar = true  

              let nodo = {
                ref: '',
                name: vm.name,
                type: tipo,
                image: res.data.image, 
                imdb_id: "tt0086250",
                //Campos para una película
                released: "1983/12/09",
                runtime: 170,
                director: "",
                plot: '',
                language: "Spanish",
                country: "ES",
                awards: "",
                trailers:"",
                //Campos para un actor
                biography: vm.biography,
                cargo: vm.cargo,
                formacion: vm.formacion,
                experiencia: vm.experiencia,
                relaciones: vm.relaciones,
                phone: vm.phone,
                phone2: vm.phone2,
                email: vm.email,
                twitter: vm.twitter,
                linkedin: vm.linkedin,                
                instagram: vm.instagram, 
                facebook: vm.facebook, 
                youtube: vm.youtube, 
                web: vm.web,               
                remarcar: remarcar,               
                birthday: ''
              }

              vm.$refs.form1.reset()
              vm.$refs.form2.reset()  

              axios.post(vm.$store.state.URL_NODE_SERVER+`/addNodes`, nodo,
                { headers : {'Authorization': 'Bearer ' + vm.token }})
                .then(response => {
                  //console.log(response.data);       
                  vm.nodos.push(response.data); 
                  vm.imageName = ''
                  vm.imageUrl = ''
                  vm.imageFile = ''
                  vm.dialogAddNodo = false
                  vm.info = 'Datos guardados'
                  vm.infoOperation = true
                }).catch(e => {console.log(e)}) 

            }).catch(function (err) {
              console.log(err.message);
            });
        
          //=> Si es una modificación entramos por aquí        
          }else {

            //=> SIN MODIFICACIÓN DE IMAGEN
            if (!this.imageFile){

              let remarcar = false
              if (this.remarcar === 'Si') remarcar = true  

              let nodo = {
                _id: this.current_id_node_to_update,
                ref: '',
                name: this.name,
                type: tipo,
                imdb_id: "tt0086250",
                //Campos para una película
                released: "1983/12/09",
                runtime: 170,
                director: "",
                plot: '',
                language: "Spanish",
                country: "ES",
                awards: "",
                trailers:"",
                //Campos para un actor
                biography: this.biography,
                cargo: this.cargo,
                formacion: this.formacion,
                experiencia: this.experiencia,
                relaciones: this.relaciones,
                phone: this.phone,
                phone2: this.phone2,
                email: this.email,
                twitter: this.twitter,
                linkedin: this.linkedin,                
                instagram: this.instagram, 
                facebook: this.facebook, 
                youtube: this.youtube, 
                web: this.web,
                remarcar: remarcar
              }

              this.$refs.form1.reset()
              this.$refs.form2.reset()  

              let vm = this

              axios.post(vm.$store.state.URL_NODE_SERVER+`/updateNode`, nodo,
                { headers : {'Authorization': 'Bearer ' + vm.token }})
                .then(response => {
                  //console.log(response.data); 
                  vm.loadNodesForTable()
                  vm.imageName = ''
                  vm.imageUrl = ''
                  vm.imageFile = ''
                  vm.dialogAddNodo = false
                  vm.info = 'Datos actualizados'
                  vm.infoOperation = true
                }).catch(e => {console.log(e)}) 

            //=> CON MODIFICACIÓN DE IMAGEN
            }else {

            //Primero subimos la imagen y despues insertamos el nodo completo
            var data = new FormData();
            data.append('foo', 'bar');
            data.append('file', this.imageFile);
            var config = {
              onUploadProgress: function(progressEvent) {
                var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
              }
            };
            let vm = this;
            let remarcar = false
            if (vm.remarcar === 'Si') remarcar = true            
            axios.post(vm.$store.state.URL_NODE_SERVER+`/uploadImage`, data, config).then(function (res) {
              
                let nodo = {
                  _id: vm.current_id_node_to_update,
                  ref: '',
                  name: vm.name,
                  type: tipo,
                  image: res.data.image, 
                  imdb_id: "tt0086250",
                  //Campos para una película
                  released: "1983/12/09",
                  runtime: 170,
                  director: "",
                  plot: '',
                  language: "Spanish",
                  country: "ES",
                  awards: "",
                  trailers:"",
                  //Campos para un actor
                  biography: vm.biography,
                  cargo: vm.cargo,
                  formacion: vm.formacion,
                  experiencia: vm.experiencia,
                  relaciones: vm.relaciones,
                  phone: vm.phone,
                  phone2: vm.phone2,
                  email: vm.email,
                  twitter: vm.twitter,
                  linkedin: vm.linkedin,                
                  instagram: vm.instagram, 
                  facebook: vm.facebook, 
                  youtube: vm.youtube, 
                  web: vm.web,                  
                  remarcar: remarcar                  
                }

                vm.$refs.form1.reset()
                vm.$refs.form2.reset()  

                axios.post(vm.$store.state.URL_NODE_SERVER+`/updateNode`, nodo,
                  { headers : {'Authorization': 'Bearer ' + vm.token }})
                  .then(response => {
                    //console.log(response.data); 
                    vm.loadNodesForTable()
                    vm.imageName = ''
                    vm.imageUrl = ''
                    vm.imageFile = ''
                    vm.dialogAddNodo = false
                    vm.info = 'Datos actualizados'
                    vm.infoOperation = true
                  }).catch(e => {console.log(e)}) 

              }).catch(function (err) {
                console.log(err.message);
              });
        

            }


          }
        
        }

      },

      clear () {        
        this.$refs.form1.reset()
        this.$refs.form2.reset()
        this.imageUrl = null
        this.dialogAddNodo = false
      },

      pickFile () {
        this.$refs.image.click ()
      },
		
      onFilePicked (e) {
        const files = e.target.files
        if(files[0] !== undefined) {
          this.imageName = files[0].name
          if(this.imageName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader ()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.imageUrl = fr.result
            this.imageFile = files[0] // this is an image file that can be sent to server...
          })
        } else {
          this.imageName = ''
          this.imageFile = ''
          this.imageUrl = ''
        }
      },

      deleteNode (){
        let vm = this
        this.dialog = false;
        axios.post(this.$store.state.URL_NODE_SERVER+`/deleteNode`, { body: this.node_to_delete },
          { headers : {'Authorization': 'Bearer ' + vm.token }})
          .then(response => {
            //console.log(response.data)
            vm.node_to_delete = null
            vm.loadNodesForTable()
          }).catch(e => {
            console.log(e)
            vm.node_to_delete = null
          }) 
      },

      cancelDeleteNode (){
        this.node_to_delete = null;
        this.dialog = false;
      },

      goToChart (name){
        this.$store.state.search = name
        this.$router.push('Redes')
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
