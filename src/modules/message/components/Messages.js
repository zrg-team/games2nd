import React, { Component } from 'react'
import { MessageList } from '../../../libraries/ChatElement'
import { back } from '../../../common/utils/navigation'
import notification from '../../../common/components/widgets/Notification'

class Messages extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.listRef = null
    this.shouldScroll = false
    this.assignRef = this.assignRef.bind(this)
  }

  assignRef (ref) {
    this.listRef = ref
  }

  UNSAFE_componentWillReceiveProps (nextProps) { // eslint-disable-line
    const { offset, refContainer } = this.props
    const { offset: nextOffset, refContainer: nextRefContainer } = nextProps
    if (offset !== nextOffset && nextOffset > offset && nextRefContainer && this.listRef) {
      this.shouldScroll = true
    }
    if (!refContainer && nextRefContainer) {
      this.shouldScroll = true
    }
  }

  componentDidUpdate () {
    if (this.shouldScroll) {
      const { refContainer } = this.props
      this.shouldScroll = false
      refContainer.scrollTop = this.listRef.scrollHeight + 100
    }
  }

  async componentDidMount () {
    const { uid, offset, getRoom, getMessages } = this.props
    try {
      const room = await getRoom(uid)
      if (room) {
        const result = await getMessages(room, offset)
        if (result) {
          return notification.success('Synced.')
        }
      }
      notification.error('Sync error !')
      throw new Error('MISSING PARAM')
    } catch (error) {
      back()
    }
  }

  render () {
    const { messages = [] } = this.props
    return (
      <div>
        <MessageList
          cmpRef={this.assignRef}
          className='message-list'
          lockable={false}
          toBottomHeight={'80%'}
          dataSource={messages}
        />
      </div>
    )
  }
}

export default Messages
