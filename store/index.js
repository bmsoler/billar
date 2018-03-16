import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({ 

    state: {
      login: true, // true => Activa la página de login, false => Entramos directamente      
      fondoDialog: 'fondoDialogAzul',      
      URL_NODE_SERVER: 'http://localhost:3020'            //  DESARROLLO
      //URL_NODE_SERVER: 'https://dev.aunnait.es:3020'    //  PRODUCCIÓN
    },

    actions: {
  
    },

    mutations: {
      loginOK() {
        this.state.login = false
      },
      loginKO() {        
        this.state.login = true       
      }
    },

    getters: {     
      getTheme: state => {
        return state.fondoDialog
      }             
    }
  })
}