<template>
    <div class="eventform-container">
      <form class="form-horizontal" @submit.prevent>
      <div class="box-body">
        <div class="form-group">
          <label class="col-xs-4 control-label">Tên:</label>
          <div class="input-group col-xs-8">
            <input type="text" class="form-control" v-model="value.name">
          </div>
        </div>

        <div class="form-group">
          <label class="col-xs-4 control-label">Số tiền ban đầu:</label>
          <div class="input-group col-xs-8">
            <span class="input-group-addon ">$</span>
            <!--<input type="text" class="form-control" v-model="value.start_amount" v-on:keyup.13="calculator">-->
            <vue-numeric class="form-control" separator="." v-model="value.start_amount" ></vue-numeric>
          </div>
        </div>
      </div>
      </form>
  </div>

</template>

<script>
  import VueNumeric from 'vue-numeric'
  import { mapState } from 'vuex'
  export default {
    props:['value'],
    components: {
      VueNumeric
    },
    methods: {
      calculator: function(e) {
          let val = this.value.amount
          this.value.amount = eval(val) || val
      }
    }
  }
</script>
