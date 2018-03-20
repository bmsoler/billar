<template>

<div>

  <v-layout row wrap align-start mx-auto> 

    <!-- REGLAMENTO -->
    <v-flex d-flex xs12 md12 lg12 style="padding: 5px">
      <v-card class="widget-title fadeIn" >
        <v-toolbar dark style="height: 100px; background: transparent; z-index: 1000">
          <v-toolbar-title class="texto">
            Reglamento
          </v-toolbar-title>         
        </v-toolbar>
        <div style="position: absolute;
          right: 10px;
          left: 10px;
          top: 60px;">


        </div>
      </v-card>        
    </v-flex>  

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

</div>

</template>

<script>
  import axios from 'axios'
  export default {
    data: () => ({
      admin: null,
      window_height: 700
    }),

    mounted() {

      this.admin = this.$store.state.admin

      //Ajuste al height de la pantalla actual
      this.window_height = window.innerHeight - 150;        

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
