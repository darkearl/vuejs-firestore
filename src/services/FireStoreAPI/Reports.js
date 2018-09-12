import { firestoreDB,API } from './db'

const rootKey = 'Reports'

const _schema = {
  "fields":{},
	"collections":[]
}

const ReportWorker = new API({
  schema : _schema,
  rootKey
})

ReportWorker.getAll = async function() {
  var result = {}
  const yearCollectionRef = this.collection(rootKey)
  let years = await yearCollectionRef.get()
  years.forEach(async year => {
    let yearData = year.data()
    let collectionMonthRef = year.ref.collection('months')
    let months = await collectionMonthRef.get()
    let result_months ={}
      months.forEach( month => {
        result_months[month.id] = month.data()
      })
      result[`${year.id}`] = {
        ...yearData,
        months: result_months
      }
  })

  return result
}


export default ReportWorker