import { handleActions } from 'redux-actions'
import * as actions from './actions'

const defaultState = {
  products: {
  },
  end: false,
  searchResult: [],
  total: 0,
  offset: 0,
  totalPage: 0,
  search: null,
  searchMode: false,
  presents: {},
  deals: []
}

const handlers = {
  [actions.setProducts]: (state, action) => ({
    ...state,
    products: {
      ...state.products,
      [action.payload.page]: action.payload.data
    },
    end: false,
    search: null,
    total: action.payload.total,
    offset: action.payload.offset,
    totalPage: action.payload.totalPage,
    searchMode: false
  }),
  [actions.appendSearchProducts]: (state, action) => ({
    ...state,
    searchResult: [
      ...state.searchResult,
      ...action.payload.data
    ],
    end: action.payload.end,
    searchMode: true,
    search: action.payload.search,
    offset: action.payload.offset
  }),
  [actions.setSearchProducts]: (state, action) => ({
    ...state,
    end: action.payload.end,
    searchResult: action.payload.data,
    searchMode: true,
    search: action.payload.search,
    offset: action.payload.offset
  }),
  [actions.setPresentInfo]: (state, action) => ({
    ...state,
    presents: action.payload
  }),
  [actions.setGreatDeals]: (state, action) => ({
    ...state,
    deals: action.payload
  })
}

export default handleActions(handlers, defaultState)
