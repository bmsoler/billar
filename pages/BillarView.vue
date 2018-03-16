<template>
  <v-container fluid fill-height>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center justify-center>

        <div id="main" style="margin-top: 30px" class="fadeIn">
            <div id="customHandlers" style="display: inline-block;"></div>           
        </div>

      </v-layout>
    </v-slide-y-transition>
    
  </v-container>
</template> 

<script>

import axios from 'axios'

export default {
    data () {
      return {                         
          token: null,
          is_admin: true
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
                        container.append("Upcoming")
                        return;            
                    case "entry-no-score":
                    case "entry-default-win":
                    case "entry-complete":
                        if ((data.image === 'angel') || (data.image === 'jaime') || (data.image === 'jesus')) {
                            container.append('<img src="static/img/'+data.image+'.jpg" width="25px" /> ').append(data.name)
                        }else {
                            container.append('<img src="static/img/'+data.image+'.png" width="25px" /> ').append(data.name)
                        }                    
                        return;
                }
            }
            
            axios.get(this.$store.state.URL_NODE_SERVER+'/getCampeonatos',
                { headers : {'Authorization': 'Bearer ' + vm.token }})
                .then(function (response) {
                    //console.log(response.data);

                    let customData = response.data[0]

                    //Montamos el cuadrante
                    $(function() {
                        $('div#customHandlers .demo').bracket({
                            init: customData,
                            teamWidth: 90,
                            scoreWidth: 45,
                            matchMargin: 50,
                            roundMargin: 90,   
                            disableToolbar: !vm.is_admin, 
                            disableTeamEdit: !vm.is_admin,
                            centerConnectors: false,
                            save: function(data, userData){                    
                                console.log('Entro en save!!!', data)
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

            


            //this.addCampeonato()

        }, // ### init


        addCampeonato() {

            let vm = this

            let campeonato = {
                name: 'I Campeonato de billar',
                teams : [
                    [{name: "Jaime", image: 'jaime'}, {name: "Ángel", image: 'angel'}],
                    [{name: "Pablo", image: 'pablo'}, {name: "Jorge", image: 'jorge'}],
                    [{name: "Jesús", image: 'jesus'}, {name: "Blas", image: 'blas'}],
                    [null, null],
                ],
                results : []
            }

            axios.post(this.$store.state.URL_NODE_SERVER+`/addCampeonato`, campeonato,
                { headers : {'Authorization': 'Bearer ' + vm.token }})
                .then(response => {
                    console.log(response.data);                                       
                }).catch(e => {console.log(e)}) 

        }

    },

    mounted(){

        this.token = this.$localStorage.get('billarToken')

        this.init(); 
              
    },

    computed: {
        
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
