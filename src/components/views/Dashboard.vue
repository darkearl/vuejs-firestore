<template>
  <div id="dashboard">
    <form @submit.prevent>
        <label for="email1">price</label>
        <input v-model.trim="price" type="text"  />

        <label for="password1">tag</label>
        <input v-model.trim="tag" type="text" />

        <button class="button" @click="regist">Log In</button>

    </form>
  </div>
  <!-- Main content -->
  
  <!-- /.content -->
</template>

<script>


export default {
    data() {
      return {
        price:'',
        tag:''
      }
    },
    methods:{
      regist(){
        
      }
    }

}
</script>
