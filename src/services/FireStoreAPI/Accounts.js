import { firestoreDB,API } from './db'

const rootKey = 'Accounts'

const _schema = {
  "fields":{
    "name" : "",
    "start_amount" : 0,
    "amount": 0,
  },
	"collections":[]
}

const AccountWorker = new API({
  schema : _schema,
  rootKey
})

AccountWorker.add = function(data) {
  data.start_amount = parseInt(data.start_amount)
  data.amount = data.start_amount
  this._add(data)
}

AccountWorker.update = async function(id,data) {
  //reset
  const oldData = await this._fetch(id)
  let newData = { ...oldData, ...data}

  newData.amount = parseInt(oldData.amount) - parseInt(oldData.start_amount) + parseInt(newData.start_amount)
  newData.start_amount = parseInt(newData.start_amount)

  //update data
  return this._update(id,newData)
}

AccountWorker.transfer = async function(mainID,targetID,amount){
  //main account
  var mainData = await this._fetch(mainID)
  mainData.amount -= parseInt(amount)

  var targetData = await this._fetch(targetID)
  targetData.amount += parseInt(amount)

  await this._update(mainID,mainData)

  await this._update(targetID,targetData)
  return true
}

export default AccountWorker