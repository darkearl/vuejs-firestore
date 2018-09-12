<template>
  <div class="login-form">
    <div class="main-div col-xs-12 col-sm-8 col-md-4">
      <div class="panel">
        <h2>Admin Login</h2>
        <!-- errors -->
        <p v-if=response class="text-red login-box-msg">{{response}}</p>
        <p v-else>Please enter your email and password</p>
      </div>
      <form id="Login" @submit.prevent="login">
          <div class="form-group">
              <input type="email" class="form-control" id="inputEmail" placeholder="Email Address" v-model.trim="email">
          </div>
          <div class="form-group">
              <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model.trim="password">
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
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

<style lang="scss" >
  @import "style";
</style>  