import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import App from './App.vue'
import Components from 'components/_index'

import { createStore } from 'store/index'
import { createRouter } from 'router/index'
import { sync } from 'vuex-router-sync'
import VueLocalStorage from 'vue-localstorage'

import '../static/css/jquery.bracket.min.css'
import '../static/css/animations.css'

Vue.use(VueLocalStorage)

Vue.use(Vuetify, { theme: {
  primary: '#EEEEEE',
  secondary: '#E0E0E0',
  accent: '#BDBDBD',
  error: '#FF5252',
  info: '#00BCD1',
  success: '#79C588',
  warning: '#FFC107'
}})

Object.keys(Components).forEach(key => {
  Vue.component(key, Components[key])
})

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp (ssrContext) {
  // create store and router instances
  const store = createStore()
  const router = createRouter()

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    ssrContext,
    localStorage: {      
      bubblesToken: {
        type: String,
        default: null
      }
    },    
    render: h => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
