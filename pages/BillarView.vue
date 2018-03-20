<template>
  <v-container fluid fill-height>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center justify-center>

        <div id="main" style="margin-top: 10px; z-index: 10" class="fadeIn">
            <div id="customHandlers" style="display: inline-block;"></div>           
        </div>

        <!-- Fechas y calendario -->
        <v-flex v-if="calendario.length > 0 || admin" d-flex xs12 md12 lg12 
            style="margin-top:20px; margin-bottom: 50px; padding: 5px; min-width: 50%">
            <v-card class="widget-title fadeIn">
                <v-toolbar dark style="height: 100px; background: transparent;">
                <v-toolbar-title class="texto">
                    Fechas y calendario
                    <v-tooltip right>
                    <v-btn v-if="admin" slot="activator" icon @click="openDialogAddEvento">
                    <v-icon>playlist_add</v-icon>
                    </v-btn>
                    <span>Añadir evento</span>
                    </v-tooltip>                    
                </v-toolbar-title>         
                </v-toolbar>
                <div style="position: absolute;
                right: 10px;
                left: 10px;
                top: 60px;">

                <v-list style="overflow: auto" v-bind:style="{  'height': events_height + 'px' }">
                <v-list-tile avatar v-for="item in calendario" :key="item.title" @click="editEvento(item)">
                    <v-list-tile-action>
                    <v-icon color="grey">event</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                    <v-list-tile-title>{{ item.info }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ item.fecha }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-avatar>
                    <img :src="item.avatar">
                    </v-list-tile-avatar>
                    <v-list-tile-avatar>
                    <img :src="item.avatar2">
                    </v-list-tile-avatar>  
                </v-list-tile>
                </v-list>            

                </div>
            </v-card>        
        </v-flex>  

        <!-- Botón para ir al gráfico -->
        <v-fab-transition v-if="admin">
        <v-btn
            router to="/Datos"
            dark
            fab
            fixed
            bottom
            right
            small
            style="background-color: rgba(255, 255, 255, 0.2)">
            <v-icon>view_list</v-icon>
        </v-btn>
        </v-fab-transition>

      </v-layout>
    </v-slide-y-transition>
    
    <!-- MODAL PARA LA INSERCIÓN DE EVENTOS -->
    <v-dialog v-model="dialogAddEvento" max-width="80%">
      <v-card dark :class="theme" class="scrollform" v-bind:style="{  'max-height': window_height + 'px' }">
        <v-card-title>
          <span class="headline">Datos del evento</span>
        </v-card-title>
        <v-card-text>
            
        <v-form v-model="valid" ref="form1" lazy-validation>          
            
          <v-layout row wrap align-start>

            <!-- Nombre -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Contrincantes" v-model="info" :rules="infoRules" required></v-text-field>              
            </v-flex>
            
            <!-- Fecha -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Fecha" v-model="fecha" :rules="fechaRules" required></v-text-field>              
            </v-flex>

            <!-- Avatar 1 -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Imagen 1" v-model="avatar" :rules="imageRules" required></v-text-field>              
            </v-flex>

            <!-- Avatar 2 -->
            <v-flex d-flex xs12 sm6 md6 style="padding: 20px; padding-top: 0px">
              <v-text-field label="Imagen 2" v-model="avatar2" :rules="imageRules" required></v-text-field>              
            </v-flex>

          </v-layout> 
        
          <v-btn v-if="admin"
            @click="saveEvento"
            color="light-green darken-4"
            :disabled="!valid" style="margin-top: 0px">
            Guardar
          </v-btn>
          <v-btn @click.native="clear" style="margin-top: 0px">Cancelar</v-btn>   
          <v-btn @click="openDialog" color="red" style="float: right; margin-top: 0px">Borrar</v-btn>   

        </v-form>

        </v-card-text>     

      </v-card>
    </v-dialog>

    <!-- CONFIRMACIÓN DE BORRADO -->
    <v-dialog v-model="dialog" max-width="50%">
        <v-card>
        <v-card-title class="headline">¿Esta seguro de que desea borrar el evento seleccionado?</v-card-title>
        <v-card-text>Esta operación no podrá ser deshecha</v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat="flat" @click="cancelDeleteEvento()">Cancelar</v-btn>
            <v-btn color="red" flat="flat" @click="deleteEvento()">Borrar</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>  

  </v-container>
</template> 

<script>
 
import axios from 'axios'

export default {
    data () {
      return {                         
            token: null,
            admin: null,
            info: '',
            fecha: '',
            avatar: '/static/img/',
            avatar2: '/static/img/',
            infoRules: [
                v => !!v || 'La información es obligatoria'
            ],          
            fechaRules: [
                v => !!v || 'La fecha es obligatoria'
            ], 
            imageRules: [
                v => !!v || 'La imagen es obligatoria'
            ],            
            calendario: [],
            //   calendario: [
            //     { info: 'Blas vs Javi', fecha: '25/02/2018 12:00h', avatar: '/static/img/blas.png', avatar2: '/static/img/javi.png' },
            //     { info: 'Jorge vs Pablo', fecha: '25/02/2018 12:00h', avatar: '/static/img/jorge.png', avatar2: '/static/img/pablo.png' }
            //   ]
            dialogAddEvento: false,
            dialog: false,
            current_id_evento_to_update: null,
            window_height: 700,
            events_height: 300,
            valid: false,
            evento_to_delete: null,
      }
    },

    computed: {
      theme(){
        return this.$store.state.fondoDialog
      }           
    },

    methods: {
    
        init(){

            let vm = this

            $(function () {
                var demos = ['customHandlers']
                $.each(demos, function (i, d) {
                    var demo = $('div#' + d)
                    $('<div class="demo"></div>').appendTo(demo)
                })
            })
            
            /* Edit function is called when team label is clicked */
            function edit_fn(container, data, doneCb) {                
                var input = $('<input type="text">')
                input.val(data ? data.image + ':' + data.name : '')
                container.html(input)
                input.focus()
                input.blur(function() {
                    var inputValue = input.val()
                    if (inputValue.length === 0) {
                        doneCb(null); // Drop the team and replace with BYE
                    } else {
                        var flagAndName = inputValue.split(':') // Expects correct input
                        doneCb({image: flagAndName[0], name: flagAndName[1]})
                    }
                })                
            }
            
            /* Render function is called for each team label when data is changed, data
            * contains the data object given in init and belonging to this slot.
            *true
            * 'state' is one of the following strings:
            * - empty-bye: No data or score and there won't team advancing to this place
            * - empty-tbd: No data or score yet. A team will advance here later
            * - entry-no-score: Data available, but no score given yet
            * - entry-default-win: Data available, score will never be given as opponent is BYE
            * - entry-complete: Data and score available
            */
            function render_fn(container, data, score, state) {
                switch(state) {
                    case "empty-bye":
                        container.append("No team")
                        return;
                    case "empty-tbd":
                        container.append("Pendiente")
                        return;            
                    case "entry-no-score":
                    case "entry-default-win":
                    case "entry-complete":
                        if ((data.image === 'angel') || (data.image === 'jaime') || (data.image === 'jesus')) {
                            container
                                .append('<img src="static/img/'+data.image+'.jpg" width="25px" style="position: absolute; width: 34px;"/> ')
                                .append('<p style="margin-left: 40px;margin-top: 7px;">'+data.name+'</p>')
                        }else {
                            container
                                .append('<img src="static/img/'+data.image+'.png" width="25px" style="position: absolute; width: 34px;"/> ')
                                .append('<p style="margin-left: 40px;margin-top: 7px;">'+data.name+'</p>')
                        }                    
                        return;
                }
            }
            
            /* Obtención del campeonato activo o seleccionado */
            axios.get(this.$store.state.URL_NODE_SERVER+'/getCampeonatos',
                { headers : {'Authorization': 'Bearer ' + vm.token }})
                .then(function (response) {
                    //console.log(response.data);

                    let customData = response.data[0]

                    //Montamos el cuadrante
                    $(function() {
                        $('div#customHandlers .demo').bracket({
                            init: customData,
                            teamWidth: 100,
                            scoreWidth: 45,
                            matchMargin: 50,
                            roundMargin: 90,   
                            disableToolbar: !vm.admin, 
                            disableTeamEdit: !vm.admin,
                            centerConnectors: false,
                            save: function(data, userData){           
                                // Actualización del campeonato
                                axios.post(vm.$store.state.URL_NODE_SERVER+`/saveCampeonato`, data,
                                    { headers : {'Authorization': 'Bearer ' + vm.token }})
                                    .then(response => {
                                        //console.log(response.data);                                       
                                    }).catch(e => {console.log(e)})
                            },                     
                            decorator: {
                                edit: edit_fn,
                                render: render_fn
                            }
                        })
                    })

                })
                .catch(function (error) {
                    vm.$localStorage.remove('billarToken')
                    vm.$localStorage.remove('billarUser')
                    vm.$localStorage.remove('billarImg')                                            
                    vm.$router.push('/') 
                }); 

        }, // ### init

        getCalendario (){
            let vm = this
            axios.get(vm.$store.state.URL_NODE_SERVER+'/getCalendario',
                { headers : {'Authorization': 'Bearer ' + vm.token }})
                .then(function (response) {
                    //console.log(response.data);
                    vm.calendario = response.data;
                })
                .catch(function (error) {
                    vm.$localStorage.remove('billarToken')
                    vm.$localStorage.remove('billarUser')
                    vm.$localStorage.remove('billarImg')                                            
                    vm.$router.push('/') 
                }); 
        },

        openDialogAddEvento(){        
            this.info = ''
            this.fecha = ''
            this.avatar = '/static/img/'
            this.avatar2 = '/static/img/'
            this.dialogAddEvento = true
            this.current_id_evento_to_update = null
        },

        openDialog(){
            this.dialog = true
        },

        editEvento(evento){
            if (this.admin) {
                this.dialogAddEvento = true
                this.current_id_evento_to_update = evento._id
                this.info = evento.info
                this.fecha = evento.fecha
                this.avatar = evento.avatar            
                this.avatar2 = evento.avatar2     
            }       
        },        

        cancelDeleteEvento (){
            this.evento_to_delete = null;
            this.dialog = false;
        },

        saveEvento () {

            if (this.$refs.form1.validate()) {          

                let vm = this

                //=> Si es un alta entramos por aquí
                if (!this.current_id_evento_to_update) {

                    let evento = {
                        info: vm.info,
                        fecha: vm.fecha,
                        avatar: vm.avatar,
                        avatar2: vm.avatar2       
                    }

                    axios.post(vm.$store.state.URL_NODE_SERVER+`/addCalendario`, evento,
                        { headers : {'Authorization': 'Bearer ' + vm.token }})
                        .then(response => {
                            //console.log(response.data); 
                            vm.getCalendario() 
                            vm.dialogAddEvento = false                                    
                        }).catch(e => {console.log(e)}) 
                
                //=> Si es una modificación entramos por aquí        
                }else {

                    let evento = {
                        _id: vm.current_id_evento_to_update,
                        info: vm.info,
                        fecha: vm.fecha,
                        avatar: vm.avatar,
                        avatar2: vm.avatar2                
                    }

                    axios.post(vm.$store.state.URL_NODE_SERVER+`/saveCalendario`, evento,
                        { headers : {'Authorization': 'Bearer ' + vm.token }})
                        .then(response => {
                            //console.log(response.data); 
                            vm.getCalendario() 
                            vm.dialogAddEvento = false                                    
                        }).catch(e => {console.log(e)}) 

                }
            
            }

        },

        deleteEvento (){
            let vm = this
            this.dialog = false;
            this.dialogAddEvento = false;
            axios.post(vm.$store.state.URL_NODE_SERVER+`/deleteCalendario`, {_id: vm.current_id_evento_to_update},
                { headers : {'Authorization': 'Bearer ' + vm.token }})
                .then(response => {
                    //console.log(response.data)
                    vm.current_id_evento_to_update = null
                    vm.getCalendario()
                }).catch(e => {
                    console.log(e)
                    vm.current_id_evento_to_update = null
                }) 
        },

        clear () {    
            this.dialogAddEvento = false       
        },

    },

    mounted(){

        this.admin = this.$store.state.admin

        this.token = this.$localStorage.get('billarToken')

        //Ajuste al height de la pantalla actual
        this.window_height = window.innerHeight - 150;   
        this.events_height = window.innerHeight - 590;   

        this.init()

        this.getCalendario()
              
    },

}

</script>


<style scoped>
    .texto {
        font-size: 17px !important; font-weight: normal !important;
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
