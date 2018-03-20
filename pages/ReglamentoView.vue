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
                  En un tiro anunciado, para entronerar legalmente una bola de color, el jugador debe indicar señalando físicamente o de forma verbal antes de cada tiro, la bola que pretende entronerar y la tronera donde dirigirá la bola. (Al anunciar el tiro nunca será necesario indicar detalles como el número de bandas, carambola, antes banda, etc.) No designar la tronera o no entronerar la bola donde se ha indicado es pérdida de turno pero no es falta, las bolas obvias no tienen porque ser anunciadas, las combinaciones y tiros por banda no son considerados obvios.    
                  <br><br>
                  Si la bola de color es entronerada tal como se anunció, cualquier otra bola o bolas de color entroneradas se consideran legalmente entroneradas.                
                  <br><br>
                  Si la bola de color anunciada no es legalmente entronerada pero como consecuencia del tiro otras de color si lo son, todas estas bolas (de cualquier color), permanecerán entroneradas.
                  <br><br>
                  Por razones tácticas un jugador puede escoger entronerar una bola obvia de su grupo y perder el turno, para lo que deberá anunciar a su oponente "seguridad", "no hay", "libre", "nada" o algo similar antes de efectuar el tiro, este tiro de seguridad es un tiro legal. Si no anunciara seguridad antes y embocara una bola obvia se considera tiro anunciado y deberá continuar tirando. Cualquier bola entronerada en un tiro de seguridad, continuará entronerada.
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
                  <br><br>
                  En competiciones individuales el derecho de apertura para los juegos siguientes al primero será decidido por la organización (el ganador, el perdedor o alternativo) comunicado con anterioridad a la competición.
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
                  <br><br>
                  No es obligatorio dirigir la bola blanca en primer lugar contra la bola más adelantada situada en el punto de pie.
                </p>  

                <h3 class="headline mb-0">Bola blanca entronerada en tiro de apertura legal</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">                    
                  Si un jugador entronera la bola blanca en un tiro de apertura legal, todas las bolas entroneradas permanecen como tales, excepción hecha de la bola 8 que será repuesta nuevamente en la mesa; ante dicha circunstancia la mesa queda en situación de abierta.
                  <br><br>
                  Como consecuencia del punto anterior, el jugador contrario obtiene bola blanca en mano detrás de la línea de cabeza, quedando impedido de tirar a cualquier bola situada detrás de dicha línea, salvo que dirija la bola blanca hacia algún punto por delante de la línea de cabeza para contactar posteriormente con la bola de color.
                </p>

                <h3 class="headline mb-0">Ausencia de falta por situación de la bola blanca fuera de la línea de cabeza</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify"> 
                  Si el jugador en turno coloca la bola blanca delante de la línea de cabeza, el árbitro o el oponente deben requerir al jugador que sitúe la bola blanca detrás de la línea. No existirá falta si el jugador cumple entonces con el requisito, o posteriormente, si tal requisito no se le exigió (la base de la bola blanca determina si ésta se encuentra dentro o fuera de la línea de cabeza).
                  <br><br>
                  La base de la bola en relación a la línea de cabeza determina si ésta es o no jugable. Específicamente, la base de la bola debe estar detrás de la línea de cabeza para ser jugable, en caso de duda el jugador deberá consultar con el árbitro.
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
                  <br><br>
                  g) Si en competiciones (ligas o torneos), el componente de un equipo aconseja a otro de su mismo equipo en la consecución de alguna jugada.
                  <br><br>
                  h) Hacer saltar fuera del billar cualquier bola a excepción de la negra, que será pérdida de la partida.
                  <br><br>
                  f) Será considerada como falta del jugador que durante el transcurso de la partida suene su móvil. Si el jugador está en juego perderá el turno. Si el turno es del jugador contrario y ya ha efectuado el tiro, el siguiente lo hara con bola en mano. Si el tiro no ha sido realizado jugará con bola en mano.
                </p>

                <h3 class="headline mb-0">Penalización por falta</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">            
                  Cuando un jugador comete falta el adversario obtiene bola en mano. Esto significa que el jugador podrá situar la bola blanca en cualquier parte de la mesa (no siendo obligada su colocación detrás de la línea de cabeza salvo en el tiro de apertura).
                  <br><br>
                  Con la condición de bola blanca en mano, el jugador puede situar la bola sobre la mesa con su mano (más de una vez si es necesario).
                  <br><br>
                  Una vez colocada la bola, la flecha y la puntera del taco (se exceptúa la suela), pueden ser también utilizadas para situar la bola blanca antes de tirar.
                </p>

                <h3 class="headline mb-0">Combinaciones</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">
                  Las combinaciones están permitidas, pero la bola 8 o las bolas del grupo contrario no pueden ser usadas como primera bola en la combinación, excepto cuando la mesa esté abierta.
                </p>

                <h3 class="headline mb-0">Bolas entroneradas ilegalmente</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">            
                  Una bola de su grupo será considerada entronerada ilegalmente cuando en el mismo tiro se cometa falta, que la bola de color designada sea entronerada en lugar distinto al indicado o que exista un aviso de "seguridad" antes del tiro.
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

                <h3 class="headline mb-0">Bola pegada a la banda</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">
                  Cuando se ejecuta un tiro en el que la bola de su grupo está pegada a la banda, se tomará como base el art.º 10 teniendo en cuenta que la bola que está pegada no se considera su validez al jugar contra ella en su contacto con la banda, siendo sin embargo válida esta banda para la bola blanca después de contactar con la de color y para esta de color si después de contactar la blanca contra ella esta se separara claramente de la banda antes de volver a contactar.
                  <br><br>
                  Una bola no se considerará pegada a banda, a menos que se examine por el árbitro o uno de los jugadores y así se indique antes de efectuar la jugada.
                </p>

                <h3 class="headline mb-0">Bola blanca en contacto</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">
                  Cuando la bola blanca se encuentra en contacto, con:
                  <br><br>
                  a) Una bola de la serie jugadora.
                  <br><br>
                  b) Una bola de la serie contraria.
                  <br><br>
                  c) Con la bola negra.
                  <br><br>
                  En el caso a), se podrá tirar sobre la bola de su serie, estando aceptado el arrastre, en caso contrario será falta y, se repone la bola entronerada si es de la serie jugadora, quedando entronerada si es de la serie contraria, en ambos casos, con bola en mano para el contrario.
                  <br><br>
                  En el caso b), se deberá tirar a banda o a otra bola. En caso de falta se aplicará lo especificado para el caso a).
                  <br><br>
                  En el caso c), cuando la bola negra es la última, será de aplicación el criterio para el caso a), si por el contrario, quedaran más bolas, deberá aplicarse el criterio para el caso b).
                  <br><br>
                  Será considerada como falta intencionada, y por ello bola en mano para el contrario, el jugar directamente sobre una bola del contrario o sobre la negra indebidamente. Caso de reincidencia, tras haber sido advertido el jugador, se castigará con partida nula.
                </p>

                <h3 class="headline mb-0">Jugando la bola 8</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">
                  Cuando se juega sobre la bola 8, el jugador en turno debe designar claramente, bien de forma verbal o físicamente, la tronera donde se va a intentar entronerarla, aun siendo obvio el destino de dicha bola.
                  <br><br>
                  Si el jugador oponente o el árbitro no entiende claramente cuál es la tronera elegida por el tirador, deberán preguntar antes de que éste inicie el tiro.
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

                <h3 class="headline mb-0">Juego empatado</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">
                  Si ninguno de los dos jugadores intentase entronerar legalmente una bola durante tres turnos consecutivos (seis turnos entre ambos jugadores), el juego será considerado como de empate, previa consulta a los jugadores y atendiendo siempre según criterio arbitral.
                  <br><br>
                  Si ambos jugadores llegaran al acuerdo de que intentar mover o entronerar una bola de color podría ser motivo de pérdida inmediata del juego, podrán pedir al árbitro coloque todas las bolas en el triángulo como al principio de la partida, volviendo a realizar el tiro de apertura el jugador que lo hiciera anteriormente.
                  <br><br>
                  Tres faltas consecutivas por parte de un jugador no significan pérdida de la partida.
                </p>

                <h3 class="headline mb-0">Descalificación</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">
                  El Director Deportivo posee el derecho de descalificar de una competición a cualquier jugador con la subsiguiente pérdida de todo derecho a premio en metálico o cualquier otra clase de premio por conducta antideportiva o por uso de tácticas en detrimento de la prueba.
                </p>

                <h3 class="headline mb-0">Consejos de los espectadores</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">
                  A los espectadores no les está permitido el aconsejar a ningún jugador durante la partida. Si después de pedirle a un espectador, bien por el árbitro o por el Director Deportivo, que depusiese su actitud, continuara haciéndolo, el árbitro deberá pedirle que abandone el área del torneo.
                </p>

                <h3 class="headline mb-0">Tiempo máximo para tirar</h3>                
                <p style="padding: 30px; padding-bottom: 10px; text-align: justify">
                  Cuando en opinión del árbitro un jugador está impidiendo la buena marcha del torneo o del juego con persistencia en el juego lento, podrá amonestar al jugador y, a su discreción, imponer un tiempo límite de un minuto entre tiros. Si a pesar de ello el jugador persistiera en su lentitud, se decretará falta, obteniendo el jugador contrario posición de bola en mano.
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
