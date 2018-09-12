<template>
    <div class="transfer-container">
      <form class="form-horizontal" @submit.prevent>
      <div class="box-body">
        <div class="form-group">
          <label class="col-xs-2 control-label">From:</label>
          <div class="input-group col-xs-10">
            <select class="form-control" v-model="value.id">
              <option v-for="option in accountOptions" v-bind:value="option.id" >{{ option.name }}({{option.amount}})</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-2 control-label">To:</label>
          <div class="input-group col-xs-10">
            <select class="form-control" v-model="value.targetID">
              <option v-for="option in accountOptions" v-bind:value="option.id" v-if="option.id != value.id" >{{ option.name }}({{option.amount}})</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-2 control-label">Amount:</label>
          <div class="input-group col-xs-10">
            <span class="input-group-addon ">$</span>
            <!--<input type="text" class="form-control" v-model="value.transfer_amount" v-on:keyup.13="calculator">-->
            <vue-numeric class="form-control" separator="." v-model="value.transfer_amount" ></vue-numeric>
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
    computed: {
      ...mapState({
        accountOptions : state => state.accounts.items,
      })
    },
    methods: {
      calculator: function(e) {
          let val = this.value.amount
          this.value.amount = eval(val) || val
      }
    }
  }
</script>
