// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Mixins from './mixins';

import store from './store'

import FireStoreAPI from '@/services/FireStoreAPI'

// import plugin
import VueGoodTablePlugin from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import Notifications from 'vue-notification'
// Import Helpers for filters
import * as filters from './filters'
// Import Views - Top level

import AppContainer from './containers'


import './assets/scss/app.scss'


Vue.config.productionTip = false
Vue.use(VueGoodTablePlugin)
Vue.use(Notifications)


Vue.use(VueRouter)
Vue.mixin(Mixins);
// Routing logic
var router = new VueRouter({
  routes: routes,
  mode: 'history',
  linkExactActiveClass: 'active',
  scrollBehavior: function(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const requiresNotAuth = to.matched.some(x => x.meta.requiresNotAuth)
  const currentUser = FireStoreAPI.getAuth()

  if (requiresAuth && !currentUser) {
    next('/login')
  }
  else if (requiresNotAuth && currentUser) {
    next('/dashboard')
  }
  else {
    next()
  }
})


/* eslint-disable no-new */
let app
FireStoreAPI.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(AppContainer)
    })
  }
})
