import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setPublicMessage = createAction(`${MODULE_NAME}_SET_PUBLIC_MESSAGE`)
export const setBlogs = createAction(`${MODULE_NAME}_SET_BLOGS`)
export const appendBlogs = createAction(`${MODULE_NAME}_APPEND_BLOGS`)
