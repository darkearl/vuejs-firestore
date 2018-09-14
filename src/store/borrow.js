import FireStoreAPI from '@/services/FireStoreAPI'


const state = {
    items: []
}
const actions = {
    loadAll({ commit, rootState },limit=50) {
        FireStoreAPI.borrow.subscribe({sort:'date:desc,created:desc',limit},(items) => {
            commit('WATCH_EVENTS',items)
        })
    },
    async delete({commit},id){
        commit('SHOW_LOADING',true, {root:true})
        await FireStoreAPI.borrow.remove(id)
        commit('SHOW_LOADING',false, {root:true})
    },
    async update({commit},data){
        commit('SHOW_LOADING',true, {root:true})
        if(data.id){
            let {id, ...props} = data
            await FireStoreAPI.borrow.update(id,props)
        }else{
            await FireStoreAPI.borrow.add(data)
        }
        commit('SHOW_LOADING',false, {root:true})
    },
    async paid({commit},{id, ...data}){
        commit('SHOW_LOADING',true, {root:true})
        await FireStoreAPI.borrow.paid(id,data)
        commit('SHOW_LOADING',false, {root:true})
    }
}
const mutations = {
  WATCH_EVENTS(state, items) {
		state.items = items;
	},
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}