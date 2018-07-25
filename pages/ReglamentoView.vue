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

              <div style="overflow: auto" v-bind:style="{  'height': window_height + 'px' }">
              	<h3 class="headline mb-0">Objetivo del juego</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">                    
                  En Bola 8 es requisito anunciar el tiro (qué bola se desea meter, y dónde), y se juega con una bola blanca y quince de color, numeradas del 1 al 15. Un jugador debe entronerar las bolas del grupo numerado del 1 al 7 (lisas) y el otro lo hará con las del 9 al 15 (rayadas). El jugador que antes entronere todas las bolas de su grupo, y tras esto la negra, gana el juego.
                </p>                   
              
                <h3 class="headline mb-0">Tiro anunciado</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">                    
                  En un tiro anunciado, para entronerar legalmente una bola de color, el jugador debe indicar señalando físicamente o de forma verbal antes de cada tiro, la bola que pretende entronerar y la tronera donde dirigirá la bola. No designar la tronera o no entronerar la bola donde se ha indicado es pérdida de turno pero no es falta.    
                  <br><br>
                  Si la bola de color es entronerada tal como se anunció, cualquier otra bola o bolas de color entroneradas se consideran legalmente entroneradas.                
                  <br><br>
                  Si la bola de color anunciada no es legalmente entronerada pero como consecuencia del tiro otras de color si lo son, todas estas bolas (de cualquier color), permanecerán entroneradas.
                </p> 

                <h3 class="headline mb-0">Triángulo</h3>                
                <div align="center">
                  <img src="http://www.billaramericano.com/rack_bola_8_.gif" alt=""> 
                </div>
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">                                     
                  Para el inicio de la partida las bolas se colocan en el triángulo con la primera bola sobre el punto de pie, la bola ocho en el centro del triángulo y una bola lisa y otra rayada en cada extremo indistintamente, sin importar el orden de las demás bolas.
                </p>     

                <h3 class="headline mb-0">Tiro de apertura</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">                    
                  El primer tiro de apertura del enfrentamiento se adjudica mediante punteo sobre la banda corta contraria, ambos jugadores lo harán con una bola distinta cada uno de ellos, ganando el derecho de elección de salida el jugador que se acerque más a la banda corta de llegada.
                </p>  

                <h3 class="headline mb-0">Mesa abierta</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">                    
                  La mesa se considera "abierta" cuando la elección del grupo de bolas (lisas o rayadas), aún no ha sido hecha, estando permitido en dicha situación dirigir la bola blanca contra una lisa para entronerar una rayada, o viceversa.
                  <br><br>
                  La mesa se considerará abierta inmediatamente después del tiro de apertura. Cuando la mesa está abierta está permitido contactar primero con la bola 8 para entronerar una lisa o una rayada.
                </p>  

                <h3 class="headline mb-0">Bola 8 entronerada en el tiro de apertura</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">                    
                  Entronerar la bola 8 en el tiro de apertura no significa perder ni ganar la partida, sino que el mismo jugador podrá decidir si vuelve a empezar el juego o simplemente se repone la bola 8 en la mesa, tirando en ambos casos el mismo jugador.
                </p>  

                <h3 class="headline mb-0">Tiro de apertura legal</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">                    
                  Para ejecutar un tiro de apertura legal el jugador, con la bola blanca detrás de la línea de cabeza, debe:
                  <br><br>
                  a) Entronerar una bola.
                  <br><br>
                  b) Tocar banda con cuatro bolas de color.
                  <br><br>
                  De no conseguir alcanzar alguno de los dos objetivos indicados en los puntos a) y b), el jugador no incurrirá en falta, pero su oponente tendrá la opción de:
                  <br><br>
                  a) Aceptar la mesa en la posición que esté y tirar.
                  <br><br>
                  b) Volver a colocar las bolas en el triángulo y realizar el tiro de apertura él mismo.
                </p>  

                <h3 class="headline mb-0">Bola blanca entronerada en tiro de apertura legal</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">                    
                  Si un jugador entronera la bola blanca en un tiro de apertura legal, todas las bolas entroneradas permanecen como tales, excepción hecha de la bola 8 que será repuesta nuevamente en la mesa; ante dicha circunstancia la mesa queda en situación de abierta.
                  <br><br>
                  Como consecuencia del punto anterior, el jugador contrario obtiene bola blanca en mano detrás de la línea de cabeza, quedando impedido de tirar a cualquier bola situada detrás de dicha línea, salvo que dirija la bola blanca hacia algún punto por delante de la línea de cabeza para contactar posteriormente con la bola de color.
                </p>

                <h3 class="headline mb-0">Tiro legal</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">
                  Con excepción del tiro de apertura y de aquellos en los que la mesa todavía permanece abierta, el jugador en turno debe contactar primero con una bola de su grupo, bien por ataque directo o bien jugando primeramente por banda, y después:
                  <br><br>
                  a) Entronerar una bola de color.
                  <br><br>
                  b) Que la bola blanca o una de color contacten con una banda.
                </p>

                <h3 class="headline mb-0">Elección de grupo</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">                                    
                  La elección de lisas o rayadas no se determina en el tiro de apertura, incluso en aquellos casos que sean entroneradas varias bolas, de uno o dos grupos.
                  <br><br>
                  La elección de grupo queda determinada sólo cuando un jugador entronera legalmente una bola de color tras el tiro de apertura, en un tiro anunciado.
                </p>

                <h3 class="headline mb-0">Anotación</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">                  
                  Un jugador continuará tirando hasta que deje de entronerar legalmente bolas de su grupo.
                  <br><br>
                  Después de que un jugador haya entronerado legalmente todas las bolas de su grupo podrá entronerar la bola 8.
                </p>

                <h3 class="headline mb-0">Faltas</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">
                  Serán consideradas como faltas las jugadas siguientes:
                  <br><br>
                  a) Fallo en ejecutar un tiro legal tal como se ha definido anteriormente.
                  <br><br>
                  b) Entronerar o hacer saltar fuera de la mesa la bola blanca.
                  <br><br>
                  c) Entronerar o hacer saltar fuera de la mesa la bola blanca en un tiro de apertura legal.
                  <br><br>
                  d) Tirar sin tener por lo menos un pie en el suelo.
                  <br><br>
                  e) Mover o tocar cualquier bola fuera del golpe de ejecución.
                  <br><br>
                  f) Hacer saltar la bola blanca por encima de otra golpeándola con el taco por debajo de su centro, (no se comete falta si accidentalmente y como consecuencia de una "pifia" se provoca que la bola blanca se eleve sobre la superficie de la mesa; de igual forma se considera legal un salto de bola blanca cuando la ejecución del golpe se realiza levantando la culata del taco y golpeando a la bola por encima de su centro).
                </p>

                <h3 class="headline mb-0">Combinaciones</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">
                  Las combinaciones están permitidas siempre que se golpee primero la bola perteneciente al grupo del jugador.
                </p>

                <h3 class="headline mb-0">Bolas entroneradas ilegalmente</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">            
                  Una bola de su grupo será considerada entronerada ilegalmente cuando en el mismo tiro se cometa falta, que la bola de color designada sea entronerada en lugar distinto al indicado.
                  <br><br>
                  Las bolas ilegalmente entroneradas permanecerán entroneradas.
                </p>

                <h3 class="headline mb-0">Bolas de color expulsadas de la mesa</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">            
                  Si alguna bola de color es impulsada fuera de la mesa, se considerará falta.
                  <br><br>
                  Todas bolas que hubieran saltado fuera de la mesa de cualquier color serán repuestas sobre la mesa.
                </p>

                <h3 class="headline mb-0">Reposición de las bolas</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">           
                  En aquellos casos en que una bola de color deba ser repuesta sobre la mesa, será colocada en la línea de pie detrás y tan cerca como sea posible del punto de pie, debiéndose ser colocada tocando cualquier otra bola que interfiera, excepto si se trata de la bola blanca.
                </p>
              
                <h3 class="headline mb-0">Bola blanca en contacto</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">
                  Cuando la bola blanca se encuentra en contacto, con otra bola, se debe jugar una bola diferente a esta.
                </p>

                <h3 class="headline mb-0">Jugando la bola 8</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">
                  Cuando se juega sobre la bola 8, el jugador en turno debe designar claramente, bien de forma verbal o físicamente, la tronera donde se va a intentar entronerarla, aun siendo obvio el destino de dicha bola.
                </p>

                <h3 class="headline mb-0">Pérdida del juego</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">
                  Un jugador pierde el juego si comete cualquiera de las siguientes infracciones:
                  <br><br>
                  a) Cometer una falta al entronerar la bola 8.
                  <br><br>
                  b) Entronerar la bola 8 en el mismo tiro que la última bola de su grupo.
                  <br><br>
                  c) Hacer saltar la bola 8 fuera de la mesa en cualquier momento de la partida, excepto en el tiro de apertura.
                  <br><br>
                  d) Entronerar la bola 8 en tronera distinta a la designada.
                  <br><br>
                  e) Entronerar la bola 8 cuando todavía queden bolas de su grupo.
                  <br><br>
                  f ) Entronerar la bola 8 y la bola blanca en el mismo tiro.
                </p>
                
                <h3 class="headline mb-0">Consejos de los espectadores</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">
                  A los espectadores no les está permitido el aconsejar a ningún jugador durante la partida. Si después de pedirle a un espectador, bien por el árbitro o por el Director Deportivo, que depusiese su actitud, continuara haciéndolo, el árbitro deberá pedirle que abandone el área del torneo.
                </p>

                <h3 class="headline mb-0">Consideraciones especiales</h3> 
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">
                	No está permitido separar una bola pegada a la banda, en ninguna circunstancia.<br>
                	Si una bola no entra en la tronera o se sale de ella, se considera no entronerada.<br>
                	<span style="color: red; font-weight: bold">No se pueden tocar las bolas en juego con las manos</span> a excepción de juego parado y por la ejecución de una falta.<br>
                </p>
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

  </v-layout>

</div>

</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    admin: null,
    window_height: 700
  }),

  mounted() {
    this.admin = this.$store.state.admin;

    //Ajuste al height de la pantalla actual
    this.window_height = window.innerHeight - 400;

  }
};
</script>

<style scoped>
.texto {
  font-size: 17px !important;
  font-weight: normal !important;
}
::-webkit-scrollbar {
  width: 12px !important;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
  border-radius: 10px !important;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px !important;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;
}

.scrollform {
  overflow-y: scroll !important;
}
</style>
