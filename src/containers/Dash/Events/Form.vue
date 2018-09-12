<template>
    <div class="eventform-container">
      <form class="form-horizontal" @submit.prevent>
      <div class="box-body">
        <div class="form-group">
          <label class="col-xs-3 control-label">Ngày:</label>
          <div class="input-group date col-xs-9">
            <div class="input-group-addon">
              <i class="fa fa-calendar"></i>
            </div>
            <DatePicker name="date" v-model="value.date"></DatePicker>
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-3 control-label">Số tiền:</label>
          <div class="input-group col-xs-9">
            <span class="input-group-addon ">$</span>
            <!--<input type="text" class="form-control" v-model="value.amount" v-on:keyup.13="calculator">-->
            <vue-numeric class="form-control" separator="." v-model="value.amount" ></vue-numeric>
          </div>
        </div>

          <div class="form-group">
            <label class="col-xs-3 control-label">Tài khoản:</label>
            <div class="input-group col-xs-9">
              <select class="form-control" v-model="value.accountID">
                <option v-for="option in accountOptions" v-bind:value="option.id" >{{ option.name }}({{option.amount}})</option>
              </select>
            </div>
          </div>


          <div class="form-group">
            <label class="col-xs-3 control-label">Danh mục:</label>
            <div class="input-group col-xs-9">
              <select class="form-control" v-model="value.tagID">
                <optgroup v-for="(group, name) in tagOptions" :label="name">
                  <option v-for="option in group" :value="option.id">
                    {{ option.name }}
                  </option>
                </optgroup>
              </select>
            </div>
          </div>


          <div class="form-group">
            <label  class="col-xs-3 control-label">Ghi chú:</label>
            <div class="input-group col-xs-9">
              <input type="text" class="form-control" placeholder="Enter ..." v-model="value.note">
            </div>
          </div>
        </div>

      </form>
  </div>

</template>

<script>
import VueNumeric from 'vue-numeric'
import {DatePicker} from '@/components'
import { mapState } from 'vuex'
  export default {
    components: {
      DatePicker,
      VueNumeric
    },
    props:['value'],
    computed: {
      ...mapState({
        accountOptions : state => state.accounts.items,
        tagOptions : state => state.tags.tagOptionsByGroup
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
