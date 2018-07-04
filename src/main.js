// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

// import { store } from './store.js'

import { store } from './store'
const fb = require('./firebaseConfig.js')

// Import Views - Top level
import AppView from './components/App.vue'


import './assets/scss/app.scss'

Vue.config.productionTip = false

Vue.use(VueRouter)

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
    const currentUser = fb.auth.currentUser

    if (requiresAuth && !currentUser) {
        next('/login')
    } else if (requiresNotAuth && currentUser) {
        next('/dashboard')
    } else {
        next()
    }
})


/* eslint-disable no-new */
let app
fb.auth.onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(AppView)
        })
    }
})
