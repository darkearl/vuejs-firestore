import { firestoreDB,API } from './db'
import {GROUP_TYPES} from './Groups'
import {FormatDBDate} from '@/common'
import moment from 'moment'

const rootKey = 'Events'

const _schema = {
  "fields":{
    "date": '',
    'note': '',
    "amount" : 0,
    "tagID" : '',
    "accountID": '',
  },
	"collections":[]
}

const EventWorker = new API({
  schema : _schema,
  rootKey
})

EventWorker.add = function(data) {
  return this._add(data).then(async ({ref: {id},newData})=>{
    await this._recount(newData)
    return id
  })
}

EventWorker.update = async function(id,data) {
  //reset
  const oldData = await this._fetch(id)
  await this._recount(oldData,true)
  //apply new
  let newData = { ...oldData, ...data}
  await this._recount(newData)

  //update data
  return this._update(id,data)
}

EventWorker.remove = async function(id) {
  const oldData = await this._fetch(id)
  await this._recount(oldData,true)
  return this._remove(id)
}

//private
EventWorker._recount = async function ({tagID, accountID, amount:eventAmount, date,...props},rollback=false){
  eventAmount = rollback && (-1 * parseInt(eventAmount)) || parseInt(eventAmount)
  var batch = firestoreDB.batch();
  //tags
  const tagRef = this.collection('Tags').doc(tagID)
  let tag = (await tagRef.get()).data()
  tag.amount += eventAmount
  batch.update(tagRef,tag)

  //accounts
  const accountRef = this.collection('Accounts').doc(accountID)
  let account =(await accountRef.get()).data()
  if(GROUP_TYPES.add == tag.groupType){
    account.amount += eventAmount
  }else{
    account.amount -= eventAmount
  }

  batch.update(accountRef,account)

  //groups
  const groupRef = this.collection('Groups').doc(tag.groupID)
  let group = (await groupRef.get()).data()
  group.amount += eventAmount
  batch.update(groupRef,group)

  //start report
  let keyYear = date.slice(0,4)
  let keyMonth = date.slice(4,6)
  const reportRef = this.collection('Reports').doc(keyYear)

  //years
  let yearData = (await reportRef.get()).data() || {}
  yearData['Groups'] = yearData['Groups'] || {}
  yearData['Groups'][`${tag.groupID}`] = yearData['Groups'][`${tag.groupID}`] || 0
  yearData['Groups'][`${tag.groupID}`] += eventAmount
  yearData['Tags'] = yearData['Tags'] || {}
  yearData['Tags'][`${tagID}`] = yearData['Tags'][`${tagID}`] || 0
  if(GROUP_TYPES.add == tag.groupType){
    yearData['Tags'][`${tagID}`] += eventAmount
  }else{
    yearData['Tags'][`${tagID}`] -= eventAmount
  }
  batch.set(reportRef,yearData,{})

  //months
  const monthReportRef = reportRef.collection('months').doc(keyMonth)
  let monthData = (await monthReportRef.get()).data() || {}
  monthData['Groups'] = monthData['Groups'] || {}
  monthData['Groups'][`${tag.groupID}`] = monthData['Groups'][`${tag.groupID}`] || 0
  monthData['Groups'][`${tag.groupID}`] += eventAmount
  monthData['Tags'] = monthData['Tags'] || {}
  monthData['Tags'][tagID] = monthData['Tags'][tagID] || 0
  if(GROUP_TYPES.add == tag.groupType){
    monthData['Tags'][tagID] += eventAmount
  }else{
    monthData['Tags'][tagID] -= eventAmount
  }


  batch.set(monthReportRef,monthData,{})
  // End report
  return batch.commit()
}

export default EventWorker