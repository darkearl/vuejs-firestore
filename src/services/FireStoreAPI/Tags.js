import { firestoreDB,API } from './db'

const rootKey = 'Tags'

const _schema = {
  "fields":{
    "name" : "",
    "amount": 0,
    "groupID":'',
    "groupType": ''
  },
	"collections":[]
}

const TagWorker = new API({
  schema : _schema,
  rootKey
})

TagWorker.add = function(data) {
  return this._add(data).then(async (result) =>{
    var {ref: {id}, newData: {name, groupID} } = result
    await this.addTagToGroup(id,name,groupID)
    return id
  })
}

TagWorker.update = async function(id,data) {
  //reset
  const oldData = await this._fetch(id)

  //apply new
  let newData = { ...oldData, ...data}

  await this.removeTagFromGroup(id,oldData.groupID)
  let {name,groupID} = newData
  await this.addTagToGroup(id,name,groupID)

  //update data
  return this._update(id,data)
}

TagWorker.remove = async function(id) {
  // const oldData = await this._fetch(id)
  // await this._recount(oldData,true)
  return this._remove(id)
}

TagWorker.addTagToGroup = async function(tagID,tagName,groupID) {
  var groupRef = await this.collection('Groups').doc(groupID)
  var dataUpdate = {}
  dataUpdate[`${rootKey}.${tagID}`] = tagName
  groupRef.update(dataUpdate)
}

TagWorker.removeTagFromGroup = async function(tagID,groupID) {
  var groupRef = await this.collection('Groups').doc(groupID)
  let group = await groupRef.get()
  let groupData = group.data()

  var dataUpdate = groupData[`${rootKey}`]

  delete dataUpdate[`${tagID}`]

  return groupRef.update({
    Tags : dataUpdate
  })
}
export default TagWorker