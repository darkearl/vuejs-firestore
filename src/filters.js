import Vue from 'vue'
import moment from 'moment'
import {FormatDisplayDate, FormatDBDate} from '@/common'

Vue.filter('count', function (arr) {
  return arr.length
})

Vue.filter('getDisplayDate', function (date){
  return moment(date, FormatDisplayDate).toDate()
})

Vue.filter('getDBDate', function (date){
  return moment(date).format(FormatDBDate)
})

Vue.filter('getDateFromDBDate', function (date){
  return moment(date, FormatDBDate).toDate()
})

Vue.filter('getDBDateToIsoString', function (date){
  return moment(date, FormatDBDate).toISOString()
})

Vue.filter('getIsoString', function (date){
  return moment(date).toISOString()
})
Vue.filter('formatPrice', function (value) {
  let val = (value/1).toFixed(0).replace('.', ',')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
})