import Vue from 'vue'
import Vuex from 'vuex'
// import objMerge from 'object-merge'
import accounts from './accounts'
import events from './events'
import groups from './groups'
import tags from './tags'
import reports from './reports'
Vue.use(Vuex)

const state = {
  // db:firebase,
  process:{
    loading: false,
    errMsg: ''
  }
}

const mutations = {
    SHOW_LOADING(state, status = true) {
  		state.process.loading = status;
  	},
}

const getters = {
    isLoading: state => {
      return state.process.loading
    }
  }

export default new Vuex.Store({
  state,
  mutations,
  getters,
  modules: {
    accounts,
    groups,
    tags,
    events,
    reports
  }
})
