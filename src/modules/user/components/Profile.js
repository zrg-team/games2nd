import React, { Component } from 'react'
import {
  withStyles,
  Icon,
  Button as NormalButton
} from '@material-ui/core'
import classNames from 'classnames'
import EditIcon from '@material-ui/icons/Edit'
import Dialog from '../../../common/components/widgets/Dialog'
import notification from '../../../common/components/widgets/Notification'
import Avatar from './Avatar'
import styles from '../styles/profile'
import EditProfile from '../containers/EditProfile'
import Button from '../../../libraries/CustomButtons/Button'
import { next } from '../../../common/utils/navigation'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uid: props.uid
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleChatClick = this.handleChatClick.bind(this)
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this)
  }

  componentDidMount () {
    const { yourProfile, uid, getGuestInformation } = this.props
    if (!yourProfile) {
      getGuestInformation(uid)
    }
  }

  static getDerivedStateFromProps (nextProps, state) {
    const { uid, getGuestInformation, yourProfile } = nextProps
    if (uid !== state.uid && !yourProfile) {
      getGuestInformation(uid)
    }
    return {
      uid
    }
  }

  async handleChatClick () {
    const {
      rooms,
      uid,
      user,
      send,
      loginUser,
      makeFriend,
      location
    } = this.props
    let message
    try {
      const room = rooms.find(item => item.guest === uid || item.host === uid)
      if (room && room.uid) {
        return next(`/message/${room.uid}`)
      }
      if (location && location.state && location.state.message) {
        message = location.state.message
      }
      const result = await makeFriend(loginUser, user)
      if (result) {
        await send(loginUser, result, {
          message
        }, 'text')
        return next(`/message/${result.id}`)
      }
      throw new Error('ERROR_RESPONSE')
    } catch (err) {
      notification.error('Create chat room error.')
    }
  }

  handleClickOpen () {
    Dialog.show(<EditProfile handleClose={this.handleClose} />)
  }

  async handleClose () {
    Dialog.hide()
  }

  async handleUploadAvatar (filename) {
    const { user, updateAvatarUrl } = this.props
    const result = await updateAvatarUrl(filename, user)
    if (result) {
      notification.success('Updated avatar.')
    }
  }

  render () {
    const { user, classes, yourProfile } = this.props
    const fab = {
      color: 'secondary',
      className: classes.fab,
      icon: <EditIcon />
    }
    return (
      <div className={classes.container}>
        <Avatar
          yourProfile={yourProfile}
          handleUploadAvatar={this.handleUploadAvatar}
          avatarURL={user.avatarURL}
          {...this.props}
        />
        <div className={classes.content}>
          <span className={classes.content_text}>{user.description || 'No information'}</span>
          <div className={classes.info}>
            <span className={classes.info_type}>Email</span>
            <span className={classes.info_data}>{user.email}</span>
          </div>
          <div className={classes.info}>
            <span className={classes.info_type}>Phone</span>
            <span className={classes.info_data}>{user.phone || 'No information'}</span>
          </div>
          <div className={classes.info}>
            <span className={classes.info_type}>Facebook</span>
            <a href={user.facebook} className={classes.info_data}>{user.facebookID || 'No information'}</a>
          </div>
          <div className={classes.info}>
            <span className={classes.info_type}>Address</span>
            <span className={classes.info_data}>{user.address || 'No information'}</span>
          </div>
          <div className={classes.social_media}>
            <div className={classes.social_media_links}>
              <button className={classes.social_media_btn} title='Facebook' tab-index='1'>
                <Icon className={classNames(classes.icon, 'fa fa-facebook')} color='primary' />
              </button>
              <button className={classes.social_media_btn} title='Instagram' tab-index='2'>
                <Icon className={classNames(classes.icon, 'fa fa-instagram')} color='secondary' />
              </button>
              <button className={classes.social_media_btn} title='Twitter' tab-index='3'>
                <Icon className={classNames(classes.icon, 'fa fa-twitter')} color='primary' />
              </button>
            </div>
          </div>
          {yourProfile
            ? <div>
              <NormalButton
                variant='fab'
                className={classes.change_info}
                color={fab.color}
                onClick={this.handleClickOpen}>
                {fab.icon}
              </NormalButton>
            </div>
            : <Button
              color='twitter'
              fullWidth
              onClick={this.handleChatClick}
            >
              CHAT NOW
            </Button>
        }
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(Profile)
