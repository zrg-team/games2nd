import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setMessages = createAction(`${MODULE_NAME}_SET_MESSAGES`)
export const setCurrentRoom = createAction(`${MODULE_NAME}_SET_CURRENT_ROOM`)
