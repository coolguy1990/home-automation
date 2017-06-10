import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import moment from 'moment';
import Vuetify from 'vuetify';

Vue.use(Vuetify);
Vue.use(VueRouter);
window.moment = moment;

Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,POST,DELETE,UPDATE,OPTIONS,HEAD,PUT,Access-Control-Allow-Origin';
Vue.prototype.$http.defaults.headers.common['X-CSRF-TOKEN'] = '';
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
