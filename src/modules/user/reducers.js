import { handleActions } from 'redux-actions'
import * as actions from './actions'

const defaultState = {
  userInformation: null,
  notifications: [],
  friend: null,
  guestInformation: null,
  products: []
}

const handlers = {
  [actions.setUserInformation]: (state, action) => ({
    ...state,
    ...{ userInformation: action.payload }
  }),
  [actions.setFriend]: (state, action) => ({
    ...state,
    ...{ friend: action.payload }
  }),
  [actions.setNotification]: (state, action) => ({
    ...state,
    ...{ notifications: action.payload }
  }),
  [actions.pushNotification]: (state, action) => {
    if (state.notifications.length > 5) {
      state.notifications.shift()
    }
    state.notifications.push(action.payload)
    return {
      ...state,
      ...{ notifications: [...state.notifications] }
    }
  },
  [actions.setGuestInformation]: (state, action) => ({
    ...state,
    ...{ guestInformation: action.payload }
  }),
  [actions.setYourProducts]: (state, action) => ({
    ...state,
    products: action.payload
  })
}

export default handleActions(handlers, defaultState)
