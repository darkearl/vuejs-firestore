import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: "AIzaSyCd297EhIrqdQGJxk--7hPkPF6LTqx21QQ",
    authDomain: "save-money-ccd7c.firebaseapp.com",
    databaseURL: "https://save-money-ccd7c.firebaseio.com",
    projectId: "save-money-ccd7c",
    storageBucket: "save-money-ccd7c.appspot.com",
    messagingSenderId: "804795309960"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')

export {
    db,
    auth,
    currentUser,
    usersCollection
}