import { handleActions } from 'redux-actions'
import * as actions from './actions'

const defaultState = {
  messages: [],
  offset: 0,
  blogs: []
}

const handlers = {
  [actions.setPublicMessage]: (state, action) => ({
    ...state,
    ...{
      offset: action.payload.offset,
      messages: [
        ...state.messages,
        ...action.payload.data
      ]
    }
  }),
  [actions.setBlogs]: (state, action) => ({
    ...state,
    blogs: action.payload
  }),
  [actions.appendBlogs]: (state, action) => ({
    ...state,
    blogs: [
      ...action.payload,
      ...state.blogs
    ]
  })
}

export default handleActions(handlers, defaultState)
