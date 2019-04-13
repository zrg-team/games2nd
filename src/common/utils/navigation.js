import {
  push,
  goBack,
  replace as funcReplace
} from 'react-router-redux'
import storeAccessible from './storeAccessible'

let timeoutNavigation
let refContainer

export function next (path, state = {}) {
  if (!refContainer) {
    refContainer = document.getElementById('root')
  }
  storeAccessible.dispatch(push({
    pathname: path,
    state
  }))
  if (timeoutNavigation) {
    clearTimeout(timeoutNavigation)
    timeoutNavigation = null
  }
  timeoutNavigation = setTimeout(() => {
    if (refContainer) {
      refContainer.scrollTop = 0
    }
    timeoutNavigation = null
  }, 50)
}

export function back () {
  if (!refContainer) {
    refContainer = document.getElementById('root')
  }
  storeAccessible.dispatch(goBack())
  timeoutNavigation = setTimeout(() => {
    if (refContainer) {
      refContainer.scrollTop = 0
    }
    timeoutNavigation = null
  }, 50)
}

export function replace (path) {
  if (!refContainer) {
    refContainer = document.getElementById('root')
  }
  storeAccessible.dispatch(funcReplace(path))
  timeoutNavigation = setTimeout(() => {
    if (refContainer) {
      refContainer.scrollTop = 0
    }
    timeoutNavigation = null
  }, 50)
}
