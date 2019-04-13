import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setProducts = createAction(`${MODULE_NAME}_SET_PRODUCT`)
export const setPresentInfo = createAction(`${MODULE_NAME}_SET_PRESENT`)
export const appendSearchProducts = createAction(`${MODULE_NAME}_APPEND_SEARCH_PRODUCT`)
export const setSearchProducts = createAction(`${MODULE_NAME}_SET_SEARCH_PRODUCT`)
