<template>
  <div>
    <div class="form-group">
      <label class="col-xs-3 control-label">Tài khoản:</label>
      <div class="input-group col-xs-9">
        <select class="form-control" v-model="value.accountIDPay">
          <option v-for="option in accountOptions" v-bind:value="option.id" >
            {{ option.name }}({{option.amount}})
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props:['value'],
  computed: {
    ...mapState({
      accountOptions : state => state.accounts.items,
    })
  }
}
</script>