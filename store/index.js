import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({ 

    state: {
      login: true, // true => Activa la página de login, false => Entramos directamente
      search: 'Televisión Murciana',
      fondoDialog: 'fondoDialogAzul',
      edit_node: null,
      //URL_NODE_SERVER: 'http://localhost:3010'            //  DESARROLLO
      URL_NODE_SERVER: 'https://dev.aunnait.es:3010'    //  PRODUCCIÓN
    },

    actions: {
  
    },

    mutations: {
      loginOK() {
        this.state.login = false
      },
      loginKO() {        
        this.state.login = true       
      },  
      setSearch (value) {
        this.state.search = value
      },
      clearSearch () {
        this.state.search = null
      },
      clearEditNode(){
        this.state.edit_node = null
      }
    },

    getters: {
      getSearch: state => {
        return state.search
      },
      getTheme: state => {
        return state.fondoDialog
      }             
    }
  })
}