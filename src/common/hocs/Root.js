import React, { Component } from 'react'
import locate from '../utils/locate'
import { loading } from '../middlewares/effects'
import storeAccessible from '../utils/storeAccessible'
import {
  signOut,
  onAuthenticationChanged
} from '../utils/authentication'
import { setSessionLoading } from '../actions/session'
import { requestMessageToken } from '../utils/notifications'
import Notification from '../components/widgets/Notification'
import { setUserInformation, setNotification } from '../../modules/user/actions'
import { getUser, userInformationListener, notificationListener } from '../../modules/user/repository'
import MainPage from './MainPage'

export default class Root extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false
    }
    this.emailLink = false
    this.firstNotificationSync = true
    this.userListenerInstance = null
    this.notificationListenerInstance = null
    this.userListener = this.userListener.bind(this)
    this.authenticationChange = this.authenticationChange.bind(this)
    this.handlerNotificationListener = this.handlerNotificationListener.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { ready } = nextState
    return ready && ready !== this.state.ready
  }

  async componentDidMount () {
    try {
      await locate()
      onAuthenticationChanged(this.authenticationChange)
    } catch (error) {
      console.log('Fatal Error. Cannot Initialize.', error)
    }
  }

  async userListener (authUser) {
    try {
      if (this.userListenerInstance) {
        this.userListenerInstance()
        this.userListenerInstance = null
      }
      this.userListenerInstance = await userInformationListener(authUser.uid, (snap) => {
        const data = snap.data()
        // if (data && !validateSessionKey(data)) {
        //   signOut()
        //   return storeAccessible.dispatch(setUserInformation(null))
        // }
        storeAccessible.dispatch(setUserInformation({
          ...data,
          uid: authUser.uid
        }))
      })
    } catch (err) {
      if (this.userListenerInstance) {
        this.userListenerInstance = null
      }
    }
  }

  async handlerNotificationListener (authUser) {
    try {
      if (this.notificationListenerInstance) {
        this.notificationListenerInstance()
        this.notificationListenerInstance = null
      }
      this.notificationListenerInstance = await notificationListener(authUser.uid, (snap) => {
        const data = []
        snap.docs.forEach((ref) => {
          const item = ref.data()
          data.push({
            uid: ref.id,
            ...item
          })
          if (!this.firstNotificationSync) {
            Notification.info(`${item.fromEmail}: ${item.message}`)
          }
        })
        this.firstNotificationSync = false
        storeAccessible.dispatch(setNotification(data))
      })
    } catch (err) {
      if (this.notificationListenerInstance) {
        this.notificationListenerInstance = null
      }
    }
  }

  async authenticationChange (authUser) {
    try {
      const { ready } = this.state
      if (!ready) {
        this.setState({
          ready: true
        })
      }
      if (authUser) {
        const result = await loading(async () => {
          const user = await getUser(authUser)
          // We need a password again for generate publicKey
          if (user && !user.publicKey) {
            // Maybe case without password login
            // Modal.show(<PasswordModal />)
            user.publicKey = 'key'
          }
          requestMessageToken(user)
          return user
        })
        if (result/* && !this.emailLink */) {
          this.handlerNotificationListener(authUser)
          storeAccessible.dispatch(setSessionLoading(false))
          storeAccessible.dispatch(setUserInformation(result))
          return this.userListener(authUser)
        }
        signOut()
      }
      // Logout clear all
      storeAccessible.dispatch(setSessionLoading(false))
      storeAccessible.dispatch(setUserInformation(null))
    } catch (err) {
      console.log('err', err)
      signOut()
      // Logout clear all
      storeAccessible.dispatch(setSessionLoading(false))
      storeAccessible.dispatch(setUserInformation(null))
    }
  }

  render () {
    const { ready } = this.state
    const { store, persistor, history } = this.props
    if (!ready) {
      return null
    }
    return (
      <MainPage
        store={store}
        history={history}
        persistor={persistor}
      />
    )
  }
}
