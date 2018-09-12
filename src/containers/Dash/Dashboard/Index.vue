<template>
  <div id="dashboard">

    <div class="row">
      <widgetTotal :columns="getColumnTotal"/>
    </div>

    <div class="row">

      <div class="col-md-8">
        <monthlyReport />
      </div>
      <div class="col-md-4">
        <widgetAccounts :data="accounts"/>
      </div>

    </div>

  </div>
</template>
<style>
  .description-block>.description-header small{
    color: inherit;
    font-weight: inherit;
  }
</style>
<script>

import { mapState,mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import widgetTotal from './Totals'
import monthlyReport from './Monthly'
import widgetAccounts from './Accounts'
export default {
  components:{
    monthlyReport,
    widgetAccounts,
    widgetTotal
  },
  data() {
    return {
      columnTotal: [],
    }
  },
  computed: {
    ...mapState({
      accounts : state => state.accounts.items,
    }),
    ...mapGetters({
      getTotalAdd: 'groups/getTotalAdd',
      getTotalSubtract: 'groups/getTotalSubtract'
    }),
    getColumnTotal() {
      let result = []
      result.push({name: 'Tổng thu',amount: this.getTotalAdd})
      result.push({name: 'Tổng chi',amount: this.getTotalSubtract})

      return result
    }
  },
  created() {
    this.getReports()
  },
  methods : {
    ...mapActions({
      getReports: 'reports/getAll',
    }),
  }
}
</script>
