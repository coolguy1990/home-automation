// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {sync} from 'vuex-router-sync'
import VueRouter from 'vue-router'

const Router = new VueRouter({
  mode: 'history',
  base: '/',
  router
})

sync(store, Router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  VueRouter,
  store,
  template: '<App/>',
  components: { App }
})
