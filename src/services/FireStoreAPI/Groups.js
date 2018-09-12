import { firestoreDB,API } from './db'

const rootKey = 'Groups'

export const GROUP_TYPES = {
  "add" : "+",
  "remove" : "-"
}
const _schema = {
  "fields":{
    "name" : "",
    "type" : GROUP_TYPES.add,
    "amount": 0,
  },
	"collections":[]
}

const GroupWorker = new API({
  schema : _schema,
  rootKey
})

GroupWorker.add = function(data) {
  this._add(data)
}


export default GroupWorker