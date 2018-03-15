<template>

<div>

  <v-layout row wrap align-start mx-auto> 

    <!-- LISTADO DE RELACIONES -->
    <v-flex d-flex xs12 md12 lg12 style="padding: 5px">
      <v-card class="widget-title fadeIn" >
        <v-toolbar dark style="height: 100px; background: transparent">
          <v-toolbar-title class="texto">
            Listado de relaciones

          <v-tooltip right>
          <v-btn slot="activator" icon @click="openDialogAddLink">
            <v-icon>playlist_add</v-icon>
          </v-btn>
          <span>Añadir relación</span>
          </v-tooltip>

          </v-toolbar-title>    
          <v-spacer></v-spacer> 
          <v-text-field
            v-model="search"
            style="min-width: 100px"
          ></v-text-field>
          <v-btn icon>
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
            :items="links" 
            :search="search">
            <template slot="items" slot-scope="props" v-if="props.item.nodo_from && props.item.nodo_to">   
              <td style="width: 30px;padding-top: 5px; padding-bottom: 5px;">
                <v-avatar
                  size='30'
                  class="grey lighten-4">
                    <img v-if="props.item.nodo_from.image" 
                      :src="props.item.nodo_from.image" alt="" 
                      style="width: 50px; height: 50px">
                </v-avatar>
              </td>          
              <td>
                {{ props.item.nodo_from.name }}</td>
              <td>               
                <i class="material-icons" style="font-size: 35px; color: #0277BD !important">trending_flat</i>
              </td>  
              <td style="width: 30px;padding-top: 5px; padding-bottom: 5px;">
                <v-avatar
                  size='30'
                  class="grey lighten-4">
                  <img v-if="props.item.nodo_to.image" 
                      :src="props.item.nodo_to.image" alt="" 
                      style="width: 50px; height: 50px">
                </v-avatar>
              </td>                   
              <td>{{ props.item.nodo_to.name }}</td>
              <td>
                <v-tooltip left>
                <v-btn slot="activator" small color="white" icon @click="openChangeCategoryDialog(props.item)">
                  <v-icon color="purple" style="font-size: 20px; color: purple !important">mode_edit</v-icon>
                </v-btn>                  
                <span>Cambiar el tipo de la relación</span>
                </v-tooltip>
                {{ props.item.type | capitalize }}                                 
                </td>
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
                <span>Eliminar relación</span>
                </v-tooltip>              
              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="info" icon="warning">
              La búsqueda de "{{ search }}" no ha obtenido resultados.
            </v-alert>
          </v-data-table>

        </div>
      </v-card>        
    </v-flex> 

  </v-layout>

  <!-- MODAL PARA LA INSERCIÓN -->
  <v-dialog v-model="dialogAddLink" max-width="60%">
      <v-card dark :class="theme">
        <v-card-title>
          <span class="headline">Nueva relación</span>
        </v-card-title>
        <v-card-text>
           
        <v-form v-model="valid" ref="form" lazy-validation>

          <v-select
            :items="tipos"
            v-model="type"
            item-text="tipo"
            label="Tipo"
            autocomplete
            :rules="typeRules"
            required
          ></v-select>

          <v-select
            :items="nodos"
            v-model="from"
            item-text="name"
            label="Origen"
            autocomplete
            :rules="fromRules"
            required
          ></v-select>

          <v-select
            :items="nodos"
            v-model="to"
            item-text="name"
            label="Destino"
            autocomplete
            :rules="toRules"
            required
          ></v-select>          

          <v-btn
            @click="submit"
            :disabled="!formValid" style="margin-top: 30px">
            Guardar
          </v-btn>
          <!-- <v-btn @click="clear" style="margin-top: 30px">Borrar</v-btn> -->
          <v-btn @click.native="dialogAddLink = false" style="margin-top: 30px">Cancelar</v-btn>          
        </v-form>

        </v-card-text>       
      </v-card>
  </v-dialog>

  <!-- CONFIRMACIÓN DE BORRADO -->
  <v-dialog v-model="dialog" max-width="50%">
    <v-card>
      <v-card-title class="headline">¿Esta seguro de que desea borrar la relación seleccionada?</v-card-title>
      <v-card-text>Esta operación no podrá ser deshecha</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat="flat" @click="cancelDeleteLink()">Cancelar</v-btn>
        <v-btn color="red" flat="flat" @click="deleteLink()">Borrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>    

  <!-- MODAL PARA LA CAMBIAR EL TIPO DE RELACIÓN DEL ENLACE -->
  <v-dialog v-model="dialogChangeCategory" max-width="50%">
      <v-card dark :class="theme">
        <v-card-title>
          <span class="headline">Seleccione el tipo de relación para este enlace</span>
        </v-card-title>
        <v-card-text>
           
        <v-form v-model="formChangeType" ref="form" lazy-validation>

          <v-select
            :items="tipos"
            v-model="type_relation"
            item-text="tipo"
            label="Tipo de relación"
            :rules="typeRules"
            autocomplete
            required
          ></v-select>

          <v-btn
            @click="changeRelationType"
            :disabled="!formChangeType"
            style="margin-top: 30px">
            Guardar
          </v-btn>
          <!-- <v-btn @click="clear" style="margin-top: 30px">Borrar</v-btn> -->
          <v-btn @click.native="dialogChangeCategory = false" style="margin-top: 30px">Cancelar</v-btn>          
        </v-form>

        </v-card-text>       
      </v-card>
  </v-dialog>


  <v-snackbar
    :timeout="timeout"
    color="error"      
    v-model="toInvalid">
    {{errorText}}
    <v-btn dark flat @click.native="toInvalid = false">Cerrar</v-btn>
  </v-snackbar>

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

</div>

</template>

<script>
  import axios from 'axios'
  export default {
    data: () => ({

      valid: false,
      from: null,
      fromRules: [
        v => !!v || 'El origen es obligatorio'
      ],
      to: null,
      toRules: [
        v => !!v || 'El destino es obligatorio'
      ],    
      type: null,
      typeRules: [
        v => !!v || 'El tipo es obligatorio'
      ],           
      nodos: [],
      links: [],
      tipos: ['Empresarial','Institucional','Social','Otras'],
      toInvalid: false,
      timeout: 3000,
      errorText: '',

      //DATOS DE LA TABLA
      search: '',
      headers: [        
        { text: '', align: 'right', sortable: false },
        { text: 'Origen', align: 'left', sortable: true, value: 'nodo_from.name' },
        { text: '', align: 'center', sortable: false },
        { text: '', align: 'right', sortable: false },
        { text: 'Destino', align: 'left', sortable: true, value: 'nodo_to.name' },
        { text: 'Tipo de relación', align: 'left', sortable: true, value: 'type' },
        { text: '', align: 'center', sortable: false }
      ],      
      rows_per_page: [10,15,25,50,{"text":"Todos","value":-1}],
      dialog: false,
      link_to_delete: null,

      dialogAddLink: false,
      dialogChangeCategory: false,
      type_relation: null,
      formChangeType: false,
      link_to_change_type: null,

      token: null

    }),

    mounted() {
      this.token = this.$localStorage.get('bubblesToken')      
      this.loadNodesForTable()
      this.loadLinksForTable()      
    },

    computed: {      
      formValid: function () {        
        return this.from && this.to
      },
      theme(){
        return this.$store.state.fondoDialog
      }
    },

    filters: {
      capitalize: function (value) {
        if (!value) return ''
        return value.toUpperCase()
      }
    },

    methods: {

      openChangeCategoryDialog (link){
        this.link_to_change_type = link
        this.type_relation = link.type
        if (link.type === 'Comercial') this.type_relation = null
        this.dialogChangeCategory = true
      },

      openDialog(link){
        this.dialog = true
        this.link_to_delete = link
      },      

      openDialogAddLink(link){
        this.dialogAddLink = true
      }, 

      loadNodesForTable (){
        let vm = this;        
        axios.get(this.$store.state.URL_NODE_SERVER+'/loadNodesForTable',
          { headers : {'Authorization': 'Bearer ' + vm.token }})
          .then(function (response) {
            //console.log(response.data);
            vm.nodos = response.data
          })
          .catch(function (error) {
            vm.$localStorage.remove('bubblesToken')
            vm.$localStorage.remove('bubblesUser')
            vm.$localStorage.remove('bubblesImg')              
            vm.$store.commit('loginKO')                
            vm.$router.push('/') 
          });
      },

      loadLinksForTable (){
        let vm = this;
        axios.get(this.$store.state.URL_NODE_SERVER+'/loadLinksForTable',
          { headers : {'Authorization': 'Bearer ' + vm.token }})
          .then(function (response) {
            //console.log(response.data);
            vm.links = response.data
          })
          .catch(function (error) {
            console.log(error);
          });
      },

      submit () {     
        let link = {
          from: ''+this.from.id,
          to: ''+this.to.id,
          id: this.from.id+'_'+this.to.id+'_d41d8cd98f00b204e9800998ecf8427e',
          nodo_from: this.from._id,
          nodo_to: this.to._id,
          name: this.to.name,
          type: this.type
        }
        if (this.from.id === this.to.id) {
          this.errorText = 'El destino introducido no es válido'
          this.toInvalid = true
          this.to = null
        }else {
          this.saveLink(link)
          this.from = null,
          this.to = null,
          this.dialogAddLink = false
        }
      },

      saveLink (link){
        let vm = this
        axios.post(this.$store.state.URL_NODE_SERVER+'/addLinks', link,
          { headers : {'Authorization': 'Bearer ' + vm.token }})
          .then(response => {
            //console.log(response.data);     
            vm.loadLinksForTable()   
            vm.clear()                     
          }).catch(e => {
            this.errorText = 'Esta relación ya existe'
            this.toInvalid = true
            //console.log(e)
          })            
      },

      clear () {
        this.$refs.form.reset()
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

      deleteLink (){
        let vm = this
        this.dialog = false;
        axios.post(this.$store.state.URL_NODE_SERVER+`/deleteLink`, this.link_to_delete,
          { headers : {'Authorization': 'Bearer ' + vm.token }})
          .then(response => {
            //console.log(response.data)
            vm.link_to_delete = null
            vm.loadLinksForTable()
          }).catch(e => {
            console.log(e)
            vm.link_to_delete = null
          }) 
      },

      cancelDeleteLink (){
        this.link_to_delete = null;
        this.dialog = false;
      },
      
      goToChart (name){ 
        this.$store.state.search = name
        this.$router.push('Redes')
      },
      
      changeRelationType (){
        let vm = this
        let link = this.link_to_change_type        
        axios.post(this.$store.state.URL_NODE_SERVER+'/updateLink', { link: link, new_type: this.type_relation },
          { headers : {'Authorization': 'Bearer ' + vm.token }})
          .then(response => {
            //console.log(response.data); 
            this.dialogChangeCategory = false    
            vm.loadLinksForTable()                                
          }).catch(e => {            
            //console.log(e)
          })  
      }

    }
  }
</script>

<style scoped>
.texto {
  font-size: 17px !important; font-weight: normal !important;
}
</style>