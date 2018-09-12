<template>
  <div class="box box-info">
    <div class="box-header with-border">
      <h3 class="box-title">Monthly Report</h3>
      <button type="button" @click="fillChartData()" class="btn btn-box-tool">
           <i class="fa fa-refresh"></i>
      </button>
      <div class="box-tools pull-right">
        <select class="form-control" v-model="year" @change="fillChartData">
          <option v-for="(value, key) in groupReports" v-bind:value="key" >{{ key }}</option>
        </select>
        <!--<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>-->
      </div>
    </div>
    <!-- /.box-header -->
    <div class="box-body">
        <p class="text-center">
          <strong v-if="year == (new Date()).getFullYear()"> 1 Jan, {{year}} - {{lastUpdate}}</strong>
          <strong v-else> 1 Jan, {{year}} - 31 Dec,{{year}}</strong>
        </p>
        <div class="row">
          <div class="col-md-8">
            <Line-chart :chart-data="chartData" :options="chartOptions"/>
          </div>
          <div class="col-md-4">
            <p class="text-center"><strong>Top 10 Chi trong tháng</strong></p>
            <ul class="products-list product-list-in-box">
              <li v-for="tag in tagsChi">
                <div>
                  <span>{{tag.id | tagNameById }}
                    <span class="label label-success pull-right">{{tag.amount|formatPrice}} <small>VNĐ</small></span>
                  </span>
                </div>
              </li>
            </ul>
            <p class="text-center"><strong>Top 10 Thu trong tháng</strong></p>
            <ul class="products-list product-list-in-box">
              <li v-for="tag in tagsThu">
                <div>
                  <span>{{tag.id | tagNameById}}
                    <span class="label label-success pull-right">{{tag.amount|formatPrice}} <small>VNĐ</small></span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

    </div>
    <!-- /.box-body -->
    <div class="box-footer clearfix">
      <div class="row">
        <div v-for="column in footerColumns" class="col-xs-6" :class="['col-sm-' + 12/footerColumns.length]">
          <div class="description-block border-right">
            <span v-if="typeof column.percent != 'undefined'" :class="['description-percentage', column.percent > 0 && 'text-green' || column.percent == 0 && 'text-yellow'|| 'text-red' ]" ><i :class="['fa', column.percent > 0 && 'fa-caret-up' || column.percent == 0 && 'fa-caret-left'|| 'fa-caret-down']"></i> {{column.percent}}%</span>
            <span v-else-if="column.ext" class="description-percentage text-yellow" >* {{column.ext}}</span>
            <br v-else />
            <h5 class="description-header">{{column.value | formatPrice}} <small>VNĐ</small></h5>
            <span class="description-text">{{column.text}}</span>
          </div>
          <!-- /.description-block -->
        </div>
        <!-- /.col -->
      </div>
    </div>
    <!-- /.box-footer -->
  </div>
</template>

<script>
import moment from 'moment'
import { LineChart } from '@/components'
import { mapState, mapActions, mapGetters } from 'vuex'
import store from '@/store'
export default {
  data(){
    return {
        year: (new Date()).getFullYear(),
        month: (new Date()).getMonth(),
        tagsChi:[],
        tagsThu:[],
        saveReports:[],
        footerColumns: [],
        chartData:null,
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
                  ticks: {
                      // Include a dollar sign in the ticks
                      callback: function(value, index, values) {
                        let val = (value/1).toFixed(0).replace('.', ',')
                        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+ ' VNĐ'
                      }
                  }
              }]
          },
          tooltips: {
            enabled: true,
            callbacks: {
              label: function(t, d) {
                 var xLabel = d.datasets[t.datasetIndex].label;
                 var yLabel = d.datasets[t.datasetIndex].data[t.index];
                  yLabel = (yLabel/1).toFixed(0).replace('.', ',')
                  yLabel = yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                 return xLabel + ': ' + yLabel + ' VNĐ';
              }
            }
          },
        }
    }
  },
  components:{
    LineChart,
  },
  computed:{
    ...mapState({
      groupReports: state => state.reports.items,
      lastUpdate: state => moment(state.reports.lastUpdated).format('DD MMM,YYYY')
    }),
    ...mapGetters({
      getGroupValue: 'reports/getGroupValue',
      getValueMonthsOfYear: 'reports/getValueMonthsOfYear',
      getTargetSave: 'reports/getTargetSave',
      getTagsOfMonth: 'reports/getTagsOfMonth'
    }),
  },
  filters: {
    tagNameById: function (id) {
      return store.getters['tags/getName'](id)
    }
  },
  methods: {
    createFooterData(groupID,year,month){
      if(month){
        var curVal = this.getGroupValue(groupID,year,month)
        var preVal = this.getGroupValue(groupID,year,month -1 )
      }else{
        var curVal = this.getGroupValue(groupID,year)
        var preVal = this.getGroupValue(groupID,year-1)
      }

      return {
        percent: this.getPercent(preVal,curVal),
        value: curVal
      }
    },
    getPercent(oldVal,newVal){
      if(0 == oldVal) return 0
      return (( newVal - oldVal) * 100)/oldVal
    },
    fillChartData(){
      const groupThuID = 'group_1'
      const groupChiID = 'group_2'

      this.chartData = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: 'Chi',
              data: this.getValueMonthsOfYear(groupChiID,this.year),
              borderColor: "#d73925",
              backgroundColor: 'transparent',
          },
            {
              label: 'Thu',
              data: this.getValueMonthsOfYear(groupThuID,this.year),
              borderColor: "#008d4c",
              backgroundColor: 'transparent',
          },

          ]
        }

      const targetSave = this.getTargetSave(this.year)

      this.footerColumns = [
        {
          ...this.createFooterData(groupThuID,this.year),
          text: 'Tổng thu'
        },
        {
          ...this.createFooterData(groupChiID,this.year),
          text: 'Tổng chi'
        },
        // {
        //   ...this.createFooterData(groupThuID,this.year,this.month),
        //   text: 'Tổng thu trong tháng'
        // },
        // {
        //   ...this.createFooterData(groupChiID,this.year,this.month),
        //   text: 'Tổng chi trong tháng'
        // },
        {
          text:'Tiết kiệm',
          value: targetSave['current'],
          ext: 'Chỉ tiêu ' + this.$options.filters.formatPrice(targetSave['target']) + ' VNĐ'
        },
        {
          text:'Có thể chi',
          value: targetSave['canUse']
        }
        ]
        this.tagsThu = this.getTagsOfMonth(groupThuID,this.year,this.month)
        this.tagsChi = this.getTagsOfMonth(groupChiID,this.year,this.month)
    }
  }

}
</script>