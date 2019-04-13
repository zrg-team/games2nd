import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const signUp = createAction(`${MODULE_NAME}_SIGN_UP`)
export const setUserInformation = createAction(`${MODULE_NAME}_SET_USER_INFORMATION`)
export const setFriend = createAction(`${MODULE_NAME}_SET_FRIEND`)

export const setNotification = createAction(`${MODULE_NAME}_SET_NOTIFICATION`)
export const pushNotification = createAction(`${MODULE_NAME}_PUSH_NOTIFICATION`)

export const setGuestInformation = createAction(`${MODULE_NAME}_SET_GUEST_INFORMATION`)
