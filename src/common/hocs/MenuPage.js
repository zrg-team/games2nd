import React from 'react'
import {
  withStyles
} from '@material-ui/core'
import {
  Public,
  Dashboard,
  ExitToApp,
  PeopleTwoTone,
  Store,
  Keyboard
} from '@material-ui/icons'
import { CSSTransitionGroup } from 'react-transition-group'
import { signOut } from '../utils/authentication'
import { replace } from '../utils/navigation'
import Sidebar from '../components/elements/Sidebar'
import NotificationHeader from '../../modules/user/containers/NotificationHeader'
import appStyle from '../styles/app'
import logo from '../../assets/images/chat-icon.png'
import store from '../store'

const SIDDE_BARS = [
  {
    // path: '/profile',
    onClick: () => {
      return replace(`/profile/${store.store.getState().user.userInformation.uid}`)
    },
    sidebarName: 'Profile',
    navbarName: 'Material Dashboard',
    icon: PeopleTwoTone
  },
  {
    path: '/room',
    sidebarName: 'Messages',
    navbarName: 'Material Dashboard',
    icon: Dashboard
  },
  {
    path: '/sell',
    sidebarName: 'Sell',
    navbarName: 'Sell Games',
    icon: Store
  },
  {
    path: '/blog-add',
    sidebarName: 'Write Blog',
    navbarName: 'Material Public',
    icon: Keyboard
  },
  {
    path: '/public',
    sidebarName: 'Public Chat',
    navbarName: 'Material Public',
    icon: Public
  },
  {
    path: '/friend',
    sidebarName: 'Find Friend',
    navbarName: 'Material PeopleTwoTone',
    icon: PeopleTwoTone
  },
  {
    onClick: () => {
      signOut()
      return replace('/login')
    },
    sidebarName: 'Signout',
    navbarName: 'Material ExitToApp',
    icon: ExitToApp
  }
]
class MenuPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mobileOpen: false
    }
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
  }
  componentDidMount () {
    // if (navigator.platform.indexOf('Win') > -1) {
    //   // eslint-disable-next-line
    //   const ps = new PerfectScrollbar(this.refs.mainPanel)
    // }
  }
  componentDidUpdate () {
    this.refs.mainPanel.scrollTop = 0
  }
  handleDrawerToggle () {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }
  render () {
    const { classes, children, marginTop = true, ...rest } = this.props
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={SIDDE_BARS}
          logoText={'GAMES2ND'}
          logo={logo}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color='blue'
          {...rest}
        />
        <div className={`${classes.mainPanel} ${classes.fullHeight}`} ref='mainPanel'>
          <NotificationHeader
            routes={SIDDE_BARS}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {marginTop && <div className={classes.defaulRow} />}
          <div className={classes.flexContainer}>
            <CSSTransitionGroup
              transitionAppear
              transitionAppearTimeout={0}
              transitionEnterTimeout={400}
              transitionLeaveTimeout={0}
              transitionName='SlideIn'
            >
              {children}
            </CSSTransitionGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(appStyle)(MenuPage)
