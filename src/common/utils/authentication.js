import store from 'store'
import firebase from './firebase'
import { ACTION_CODE_SETTING } from '../models'
import storeAccessible from './storeAccessible'
import { setUserApproveID } from '../actions/session'
import { setUserSessionSecurity, setUserSessionKey } from '../actions/common'

export const createUserByEmail = async (email, iHere) => {
  const result = await firebase.auth.createUserWithEmailAndPassword(email, iHere)
  firebase.auth.currentUser.sendEmailVerification()
  return result
}

export const signInByEmail = async (email, proveMe) => {
  try {
    const result = await firebase.auth.signInWithEmailAndPassword(email, proveMe)
    if (firebase.auth.currentUser && firebase.auth.currentUser.emailVerified) {
      return result
    }
    throw new Error('LOGIN_FAIL')
  } catch (err) {
    return false
  }
}

export const signOut = () => {
  firebase.auth.signOut()
  storeAccessible.dispatch(setUserApproveID(null))
  storeAccessible.dispatch(setUserSessionSecurity(null))
  storeAccessible.dispatch(setUserSessionKey(null))
  storeAccessible.clearPersistStore()
}

export function authenticationEmail (email) {
  return firebase.auth.sendSignInLinkToEmail(email, ACTION_CODE_SETTING)
    .then(() => {
      store.set('authenticationMail', email)
      return email
    })
}

export function validateSessionKey (user) {
  const state = storeAccessible.getState()
  const sessionKey = state.common.sessionKey
  return !user.sessionKey || !sessionKey || user.sessionKey === sessionKey
}

export function onAuthenticationChanged (callback) {
  firebase.auth.onAuthStateChanged(callback)
}
