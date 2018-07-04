<template>
  <div id="login">
        <section>
            <div class="col1">
                <h1>Vuegram</h1>
            </div>
            <div class="col2">
                <form @submit.prevent>
                    <h1>Welcome Back</h1>

                    <label for="email1">Email</label>
                    <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />

                    <label for="password1">Password</label>
                    <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />

                    <button class="button" @click="login">Log In</button>

                </form>
            </div>
        </section>
    </div>
</template>

<script>
const fb = require('../firebaseConfig.js');

export default {
  data() {
    return {
        loginForm: {
            email: '',
            password: ''
        }
    }
  },
  methods: {
    login() {
        fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
            this.$store.commit('setCurrentUser', user)
            this.$router.push('/dashboard')
        }).catch(err => {
            console.log(err)
        })

    }
  }

}
</script>

<style>

</style>
