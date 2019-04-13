import React, { Component } from 'react'
import { ChatList } from '../../../libraries/ChatElement'
import notification from '../../../common/components/widgets/Notification'

class Rooms extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: props.user
    }
    this.openRoom = this.openRoom.bind(this)
  }

  openRoom (item) {
    const { goTo } = this.props
    goTo(item)
  }

  async componentDidMount () {
    const { user, getRooms } = this.props
    if (!user) {
      return false
    }
    const result = await getRooms(user)
    if (result) {
      return notification.success('Synced.')
    }
    return notification.error('Sync error !')
  }

  static getDerivedStateFromProps (nextProps, state) {
    const { user, getRooms } = nextProps
    if (!state.user && user) {
      getRooms(user)
    }
    return {
      user
    }
  }

  render () {
    const { rooms = [] } = this.props
    return (
      <div>
        <ChatList
          className='chat-list'
          onClick={this.openRoom}
          dataSource={
            rooms.map(item => {
              return {
                avatar: item.guestAvatar || require('../../../assets/images/no-image-icon.png'),
                alt: 'rooms',
                title: item.guestName,
                subtitle: item.message,
                date: item.lasted ? new Date(item.lasted) : undefined,
                unread: item.count || 0,
                ...item
              }
            })} />
      </div>
    )
  }
}

export default Rooms
