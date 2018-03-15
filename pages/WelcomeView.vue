<template>

  <v-layout row wrap align-start>

    <!-- CONTENEDOR DE LA IZQUIERDA ########################## -->
    <v-flex d-flex xs12 sm3 md3>
      <v-layout row wrap>

      <v-flex d-flex mr-3 mb-3>
        <v-card class="widget-title">
          <v-card-title primary class="title">Lorem</v-card-title>
          <v-card-text v-text="lorem">
          </v-card-text>
        </v-card>
      </v-flex>    

      <v-flex d-flex mr-3 mb-3>
        <v-card color="purple" dark>
          <v-card-title primary class="title">Lorem</v-card-title>
          <v-card-text v-text="lorem">
          </v-card-text>
        </v-card>
      </v-flex>        

      </v-layout>
    </v-flex>
    <!-- FIN CONTENEDOR DE LA IZQUIERDA ###################### -->

    <!-- CONTENEDORES DE LA DERECHA ############################ -->
    <v-flex d-flex xs12 sm9 md9>
      <v-layout row wrap>

      <v-flex d-flex xs12 sm12 md12 child-flex mb-3>
        <v-card color="green lighten-2" dark>
          <v-card-text
            v-text="lorem.slice(0, 90)">
          </v-card-text>
        </v-card>
      </v-flex>        

      <v-flex d-flex xs12 sm12 md12 child-flex mb-3>
        <v-card color="teal" dark>
          <v-card-text
            v-text="lorem.slice(0, 190)">
          </v-card-text>
        </v-card>
      </v-flex> 

      <v-flex d-flex xs12 sm12 md12 child-flex mb-3>
        <v-layout row wrap>

        <v-container fluid grid-list-md>
          <v-layout row wrap>

            <v-flex d-flex xs12 sm6 md6>
              <v-card color="grey" dark>
                <v-card-title primary class="title">Lorem</v-card-title>
                <v-card-text
                  v-text="lorem">
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex d-flex xs12 sm6 md6>
              <v-card color="cyan" dark>
                <v-card-title primary class="title">Lorem</v-card-title>
                <v-card-text
                  v-text="lorem">
                </v-card-text>
              </v-card>
            </v-flex>            

          </v-layout>
        </v-container>

        </v-layout>
      </v-flex> 

      </v-layout>
    </v-flex>
    <!-- FIN CONTENEDOR DE LA DERECHA ###################### -->

  </v-layout>

</template>

<script>
  export default {
    data: () => ({
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    })
  }
</script>

<style>
.content {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    max-width: 100%;
    -webkit-transition: 0.2s padding cubic-bezier(0.4, 0, 0.2, 1);
    transition: 0.2s padding cubic-bezier(0.4, 0, 0.2, 1);
    will-change: padding;
    padding-top: 0px !important;
}  
.container {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 100%;
    flex: 1 1 100%;
    margin: auto;
    padding: 16px;
    padding-top: 0px;
    width: 100%;
}
</style>
