require('./bootstrap')

import Vue from 'vue'
import App from './App'
import routes from './router'
import store from './store'
import {sync, } from 'vuex-router-sync'
import VueRouter from 'vue-router'

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
})

sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App, },
})
