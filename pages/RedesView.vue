<template>
  <v-container fluid style="padding-top: 0px !important ">
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>

       
      </v-layout>
    </v-slide-y-transition>
    
  </v-container>
</template> 

<script>

import axios from 'axios'

export default {
    data () {
      return {                         
          token: null
      }
    },

    methods: {
    
        
    },

    mounted(){

        this.token = this.$localStorage.get('bubblesToken')
              
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
