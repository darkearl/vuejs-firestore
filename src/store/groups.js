import FireStoreAPI from '@/services/FireStoreAPI'
import _ from 'lodash'
// dispatch('groups/loadAll', {}, { root: true })
const GROUP_THU_ID = 'group_1'
const GROUP_CHI_ID = 'group_2'
const state = {
    items: [],
    objItems: {},

}
const actions = {
    init({ commit, rootState }) {
        FireStoreAPI.groups.subscribe({sort:''},(items) => {
            commit('WATCH_GROUPS',items)
            commit('tags/CREATE_TAG_OPTIONS_BY_GROUP',items,{root:true})
        })
    },
}
const mutations = {
    WATCH_GROUPS(state, items) {
		state.items = items;
		state.objItems = _.keyBy(items, 'id')
	}
}

const getters = {
    getName : (state) => (id) => {
        return state.objItems[id]['name'] || ''
    },
    getTotalAdd : state =>  state.objItems.group_1 && state.objItems.group_1.amount || 0,
    getTotalSubtract : state =>  state.objItems.group_2 && state.objItems.group_2.amount || 0,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
