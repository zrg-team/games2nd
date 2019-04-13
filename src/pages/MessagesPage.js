import React from 'react'
import {
  withStyles
} from '@material-ui/core'
import 'emoji-mart/css/emoji-mart.css'
import MenuPage from '../common/hocs/MenuPage'
import Messages from '../modules/message/containers/Messages'
import ChatInput from '../modules/message/containers/ChatInput'
import appStyle from '../common/styles/app'
import { back } from '../common/utils/navigation'

class MessagesPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      refContainer: null
    }
    this.assignRef = this.assignRef.bind(this)
  }
  assignRef (refContainer) {
    this.setState({
      refContainer
    })
  }
  componentDidMount () {
    const { match: { params } } = this.props
    if (!params || !params.uid) {
      back()
    }
  }

  render () {
    const { refContainer } = this.state
    const { classes, match = {} } = this.props
    return (
      <MenuPage>
        <div className={classes.messageContainer}>
          <div
            ref={this.assignRef}
            className={`scrollbar`}
            style={{ flex: 1, overflowY: 'auto' }}
          >
            <Messages
              uid={match.params ? match.params.uid : undefined}
              refContainer={refContainer}
            />
          </div>
          <div
            style={{ marginTop: 10, height: 110, overflowY: 'hidden' }}
          >
            <ChatInput />
          </div>
        </div>
      </MenuPage>
    )
  }
}

export default withStyles(appStyle)(MessagesPage)
