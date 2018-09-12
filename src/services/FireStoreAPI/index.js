import {auth} from './db'

import groups,{GROUP_TYPES} from './Groups'
import events from './Events'
import accounts from './Accounts'
import tags from './Tags'
import reports from './Reports'

export default {
  signIn(email, pass) {
    return auth.signInWithEmailAndPassword(email, pass)
  },
  onAuthStateChanged (callback) {
    auth.onAuthStateChanged((user) => callback(user))
  },
  getAuth () {
    return auth.currentUser
  },
  events,
  groups,
  tags,
  accounts,
  reports
}
