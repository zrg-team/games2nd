import React from 'react'
import { render } from 'react-dom'
import Root from './common/hocs/Root'
import store, { history } from './common/store'
import registerServiceWorker from './registerServiceWorker'
import './assets/scss/material-kit-react.css'
import './common/utils/firebase'
import './common/styles/app.css'
import './common/styles/transition.css'

render(
  <Root {...store} history={history} />,
  document.getElementById('root')
)

registerServiceWorker()
