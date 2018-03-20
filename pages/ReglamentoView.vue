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

          <v-card>
            <v-card-media src="/static/img/header.jpg" height="200px">
            </v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Billar Bola 8</h3>
                <div>
                  
                  <p style="padding: 30px; text-align: justify">                    
                    Bola-8 es un juego de bola cantada jugado con una bola blanca y quince bolas objetivo numeradas del 1 al 15. <br><br>Cada jugador o equipo tiene un grupo de 7 bolas: las lisas (de un solo color, numeradas del 1 al 7), o las rayadas numeradas del 9 al 15. La bola-8 es la bola que gana la partida. El objetivo del juego es que usted emboque todo su grupo de bolas, y entonces emboque la bola-8. El enfrentamiento lo juegan dos jugadores o dos equipos.
                 
                    <br><br>Las bolas se colocan de la siguiente manera:<br><br>

                    En un triángulo con la bola ápice en el punto de pie;
                    Las hileras detrás del ápice quedan paralelas a la línea de pie;
                    La bola-8 está en el medio de la hilera de tres bolas;
                    El resto de las bolas se colocan al azar, excepto que la bola en cada esquina de atrás tiene que ser de distinto grupo que la de la otra esquina de atrás. La orientación izquierda/derecha de los grupos de estas bolas no importa. (Ver Decisiones Aplicadas)                    
                  </p>
                   
                </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <!-- <v-btn flat color="orange">Share</v-btn>
              <v-btn flat color="orange">Explore</v-btn> -->
            </v-card-actions>
          </v-card>

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
