import { firestoreDB,API } from './db'

const rootKey = 'Borrow'

const _schema = {
  "fields":{
    "date": '',
    'note': '',
    "amount" : 0,
    "paid" : false,
    "accountIDGet": '',
    "accountIDPay": '',
  },
	"collections":[]
}

const BorrowWorker = new API({
  schema : _schema,
  rootKey
})

BorrowWorker.add = function(data) {
  data.amount = parseInt(data.amount)
  return this._add(data).then(async ({ref: {id},newData})=>{
    await this._recount(newData)
    return id
  })
}

BorrowWorker.update = async function(id,data) {
  //reset
  const oldData = await this._fetch(id)
  await this._recount(oldData,true)
  //apply new
  let newData = { ...oldData, ...data}
  await this._recount(newData)

  //update data
  return this._update(id,data)
}

BorrowWorker.remove = async function(id) {
  const oldData = await this._fetch(id)
  await this._recount(oldData,true)
  return this._remove(id)
}

BorrowWorker.paid = async function(id,data) {
  data.paid = true
  const { paid } = data
  await this._refun(data)
  return this._update(id,data)
}

BorrowWorker._recount = async function({accountIDGet:accountID, amount },rollback=false){
  var batch = firestoreDB.batch();
  amount = rollback && (-1 * parseInt(amount)) || parseInt(amount)
  const accountRef = this.collection('Accounts').doc(accountID)
  let account =(await accountRef.get()).data()
  account.amount -= amount
  batch.update(accountRef,account)
  return batch.commit()
}

BorrowWorker._refun = async function({accountIDPay,amount}){
  amount = parseInt(amount)
  const accountRef = this.collection('Accounts').doc(accountIDPay)
  let account =(await accountRef.get()).data()
  account.amount += amount
  return accountRef.update(account)
}
export default BorrowWorker