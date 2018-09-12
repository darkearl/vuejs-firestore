import FireStoreAPI from '@/services/FireStoreAPI'


const state = {
    items: []
}
const actions = {
    loadAll({ commit, rootState }) {
        FireStoreAPI.events.subscribe({sort:'date:desc,created:desc'},(items) => {
            commit('WATCH_EVENTS',items)
        })
    },
    async delete({commit},id){
        commit('SHOW_LOADING',true, {root:true})
        await FireStoreAPI.events.remove(id)
        commit('SHOW_LOADING',false, {root:true})
    },
    async update({commit},data){
        commit('SHOW_LOADING',true, {root:true})
        if(data.id){
            let {id, ...props} = data
            await FireStoreAPI.events.update(id,props)
        }else{
            await FireStoreAPI.events.add(data)
        }
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
