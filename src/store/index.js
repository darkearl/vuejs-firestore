import Vue from 'vue'
import Vuex from 'vuex'
import objMerge from 'object-merge'
const fb = require('../firebaseConfig.js')

import loginStore from './login'

Vue.use(Vuex)

const rootStore = objMerge(
    loginStore
    )
export const store = new Vuex.Store(rootStore)
