import React, { Component } from 'react'
import { connect } from 'react-redux'
import NoPage from './NoPage'

class AutheticationPage extends Component {
  componentDidMount () {
    const { sessionLoading } = this.props
    this.processLoading = sessionLoading || false
  }
  render () {
    const { Page, user, sessionLoading, ...props } = this.props
    if (!user || sessionLoading) {
      return (<NoPage
        sessionLoading={sessionLoading}
        processLoading={this.processLoading}
      />)
    }
    return (
      <Page {...props} />
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.userInformation,
  sessionLoading: state.session.sessionLoading
})

export default connect(mapStateToProps, null)(AutheticationPage)
