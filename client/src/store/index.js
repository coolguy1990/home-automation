import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = true

export default new Vuex.Store({
  modules: {

  },
  strict: debug,
  plugins: [
    createLogger()
  ]
})
