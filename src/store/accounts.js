import FireStoreAPI from '@/services/FireStoreAPI'
import _ from 'lodash'

const state = {
    items: [],
    objItems: {}
}
const actions = {
    init({ commit, rootState }) {
        FireStoreAPI.accounts.subscribe({sort:'created'},(items) => {
            commit('WATCH_ACCOUNTS',items)
        })
    },
    // delete({},id){
    //     FireStoreAPI.deleteAccount(id)
    // },
    async update({commit},data){
        commit('SHOW_LOADING',true, {root:true})
        if(data.id){
            let {id, ...props} = data
            await FireStoreAPI.accounts.update(id,props)
        }else{
            await FireStoreAPI.accounts.add(data)
        }
        commit('SHOW_LOADING',false, {root:true})
    },
    async transfer({ commit },data){
        commit('SHOW_LOADING',true, {root:true})
        let {id,targetID,transfer_amount,...props} = data
        await FireStoreAPI.accounts.transfer(id,targetID,transfer_amount)
        commit('SHOW_LOADING',false, {root:true})
    }
}
const mutations = {
    WATCH_ACCOUNTS(state, items) {
		state.items = items;
		state.objItems = _.keyBy(items, 'id')
	},
}


const getters = {
    getName : (state) => (id) => {
        return state.objItems[id]['name'] || ''
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
