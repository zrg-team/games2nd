import React, { Component, Fragment } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import Routes from '../routes'
import Modal from '../components/widgets/Modal'
import Dialog from '../components/widgets/Dialog'
import Notification from '../components/widgets/Notification'
import PageLoading from '../components/widgets/PageLoading'
import ProgressLoading from '../components/widgets/ProgressLoading'

export default class Main extends Component {
  shouldComponentUpdate (nextProps) {
    return false
  }
  render () {
    const { store, persistor, history } = this.props
    return (
      <Fragment>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Fragment>
              <ConnectedRouter history={history}>
                <Routes store={store} />
              </ConnectedRouter>
              <ProgressLoading.Component />
              <Modal.Component global />
              <Dialog.Component global />
              <Notification.Component global />
            </Fragment>
          </PersistGate>
        </Provider>
        <PageLoading.Component type='bars' />
      </Fragment>
    )
  }
}
