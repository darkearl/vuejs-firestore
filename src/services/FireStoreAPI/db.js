import {ConfigFirestore} from '@/common'
import firebase from 'firebase'


/* Instantiate firebase */
export const firebaseDB = firebase.initializeApp(ConfigFirestore)

/* Intitialize the firestore database */
export const firestoreDB = firebaseDB.firestore();

firestoreDB.settings({
	timestampsInSnapshots: true // date issue fix according to firebase
});

export const auth = firebase.auth()

function API (opt) {
  if (!(this instanceof API)) {
    return new API(opt)
  }

  opt = opt || {}

  if (!opt.rootKey) {
    throw new Error('rootKey is required')
  }

  this._setDefaultsOptions(opt)
}

API.prototype._setDefaultsOptions = function(opt) {
  this.rootKey = opt.rootKey
  this.schema = opt.schema || {
    "fields":{},
    "collections": []
  }
}

API.prototype.collection = function(name) {
  return firestoreDB.collection(name)
}

API.prototype.subscribe = function(filter,callback){
  const collection = this.collection(this.rootKey)
  const query = this._buildQuery(collection,filter)

  return query.onSnapshot(querySnapshot => {
    	const items = []
    	querySnapshot.forEach(doc => {
    		items.push({ id: doc.id, ...doc.data() })
    	})
    	if(callback) callback(items)
    })
}

API.prototype._add = function(data,id) {
  data.created = data.created || Date.now()
  let newData =  {...this.schema.fields, ...data}
  if(id){
    const query = firestoreDB.doc(this.rootKey + "/" + id)
    return query.set(newData).then((ref) => {
      return {ref, newData}
    })
  }else{
    const query = this.collection(this.rootKey)
    return query.add(newData).then((ref) => {
      return {ref, newData}
    })
  }
}

API.prototype._update = function(id,data) {
  const query = this.collection(this.rootKey).doc(id)
  return query.update(data)
}


API.prototype._remove = function(id) {
  const query = this.collection(this.rootKey).doc(id)
  return query.delete()
}

API.prototype._fetch = function(id) {
  const query = this.collection(this.rootKey).doc(id)
  return query.get().then(doc => {
    return doc.data()
  })
}

API.prototype._setObjToField = function(fieldName, id, value, dataUpdate = {}) {
  dataUpdate[`${fieldName}.${id}`] = value
  return dataUpdate
}


API.prototype._buildQuery = (collectionRef, queryProps) => {
  let query = collectionRef;
  const { sort, limit, filter } = queryProps;
  if (sort) {
    sort.split(',').forEach(sortItem => {
      const [field, order] = sortItem.split(':');

      query = query.orderBy(field, order);
    });
  }

  if (limit) {
    query = query.limit(limit);
  }

  if (filter) {
    //if filter is array of array, build the compound query
    if (Array.isArray(filter[0])) {
      filter.forEach(clause => {
        query = query.where(...clause);
      });
    } else {
      //build the simple query
      query = query.where(...filter);
    }
  }

  return query;
}

export {API}