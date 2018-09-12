import FireStoreAPI from '@/services/FireStoreAPI'
import _ from 'lodash'
// dispatch('groups/loadAll', {}, { root: true })
const state = {
    items: [],
    objItems: {},
    tagOptionsByGroup : {}
}

const actions = {
    init({ commit, rootState }) {
        FireStoreAPI.tags.subscribe({sort:'created:desc'},(items) => {
            commit('WATCH_TAGS',items)
            commit('CREATE_TAG_OPTIONS_BY_GROUP',rootState.groups.items)
        })
    },
    delete({},id){
        FireStoreAPI.deleteTag(id)
    },
    async update({commit, rootState},data){
        commit('SHOW_LOADING',true, {root:true})
        let {groupID} = data
        let {type} = _.find(rootState.groups.items, ['id',groupID])
        data.groupType = type
        if(data.id){
            let {id, ...props} = data
            await FireStoreAPI.tags.update(id,props)
        }else{
            await FireStoreAPI.tags.add(data)
        }
        commit('SHOW_LOADING',false, {root:true})
    }
}

const mutations = {
    WATCH_TAGS(state, items) {
		state.items = items;
		state.objItems = _.keyBy(items, 'id')
	},
	CREATE_TAG_OPTIONS_BY_GROUP(state,groupItems){
        const tagOptions ={}
        groupItems.forEach(group => {
            let {name: groupName} = group
            //tagOptions
            tagOptions[groupName] = []
            for (var tagID in group.Tags) {
                var tagName = group.Tags[tagID]
                tagOptions[groupName].push({
                    id: tagID,
                    name: tagName
                })
            }
        })
        state.tagOptionsByGroup = tagOptions
	}
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
