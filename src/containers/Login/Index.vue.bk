<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="../../index2.html"><b>Admin</b>LTE</a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">Welcome back</p>
      <!-- errors -->
      <p v-if=response class="text-red login-box-msg">{{response}}</p>

      <form @submit.prevent="login">
        <div class="form-group has-feedback">
          <input type="email" class="form-control" v-model.trim="email" placeholder="you@email.com">
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" v-model.trim="password" placeholder="******">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
          <div class="col-xs-8">
          </div>
          <!-- /.col -->
          <div class="col-xs-4">
            <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
          </div>
          <!-- /.col -->
        </div>
      </form>

    </div>
    <!-- /.login-box-body -->
  </div>
</template>


<script>
import FireStoreAPI from '@/services/FireStoreAPI'
export default {
  data() {
    return {
        response: false,
        email: '',
        password: '',
        loading: ''
    }
  },
  methods: {
     login() {
        const { email, password } = this
        this.toggleLoading()
        this.resetResponse()
        FireStoreAPI.signIn(email, password)
          .then(user => {
              this.toggleLoading()
              this.$router.push('/dashboard')
          })
          .catch(error=> {
              this.toggleLoading()
              this.response = error.message
          })
    },
    toggleLoading() {
      this.loading = this.loading === '' ? 'loading' : ''
    },
    resetResponse() {
      this.response = ''
    }
  }

}
</script>

<style>
  @import 'style.css';
</style>