import FireStoreAPI from '@/services/FireStoreAPI'
import {TargetSave} from '@/common'
import _ from 'lodash'
// dispatch('groups/loadAll', {}, { root: true })
const GROUP_THU_ID = 'group_1'
const GROUP_CHI_ID = 'group_2'
const state = {
    items: {},
    lastUpdated: null,
}
const actions = {
  async getAll({ commit, rootState }) {
      let items = await FireStoreAPI.reports.getAll()
      await commit('WATCH_REPORT',items)
  },
}

const mutations = {
  WATCH_REPORT(state, items) {
		state.items = items;
		state.lastUpdated = new Date()
	},
}

const getters = {
  getUpdateTime: (state) => {
    return state.lastUpdated
  },
  getTargetSave: (state,getters) => (year) => {
    var savePercent = _.sumBy(TargetSave, 'value')
    var result={}
    const totalAdd = getters.getGroupValue(GROUP_THU_ID,year)
    const totalSubtract = getters.getGroupValue(GROUP_CHI_ID,year)
    var totalCurrent = totalAdd - totalSubtract

    result['savePercent'] = savePercent
    result['target'] = totalAdd * savePercent
    result['current'] = totalCurrent
    result['canUse'] = totalCurrent - result['target']
    result['detail'] = []
    _.forEach(TargetSave, function(v, k) {
        var t = {...v}
        t.value = totalCurrent * v.value / savePercent
        result['detail'].push(t)
    })
    console.log(result)
    return result
  },
  getValueMonthsOfYear: (state) => (id,year) => {
    let months = state.items[year] && state.items[year]['months'] || {}
    var data = []

    for (var i = 0; i < 12; i++) {
      var key = ((i+1) < 10 ? '0' : '') + (i + 1)
      if (months.hasOwnProperty(key)) {
        data[i]=months[key]['Groups'][id] || 0
      }else{
        data[i]=''
      }
    }
    return data
  },
  getGroupValue : (state) => (id,year,month=null) => {
    if(month){
      let key_curMonth = ((month+1) < 10 ? '0' : '') + (month + 1)
      let months = state.items[year] && state.items[year]['months'] || {}
      return months[key_curMonth] && months[key_curMonth]['Groups'][id] || 0
    }else{
      return state.items[year] && state.items[year]['Groups'][id] || 0
    }
  },
  getTagsOfMonth: (state) => (groupID,year,month,limit=10) => {
    let key_curMonth = ((month+1) < 10 ? '0' : '') + (month + 1)
    let months = state.items[year] && state.items[year]['months'] || {}
    let tags = months[key_curMonth] && months[key_curMonth]['Tags'] || {}

    let filterTags = {}
    if(GROUP_THU_ID == groupID){
        filterTags= _.pickBy(tags, function(v) { return v > 0; });
      }else{
        filterTags= _.pickBy(tags, function(v) { return v < 0; });
      }

    let arrObj = _.map(filterTags, (amount, id) => ({ id, amount: Math.abs(amount) }))
    let arrObjSorted = _.orderBy(arrObj, ['amount'], ['desc']);
    return _.slice(arrObjSorted, 0, limit)
  }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
