import React from 'react'
import {
  withStyles
} from '@material-ui/core'
import MenuPage from '../common/hocs/MenuPage'
import GridContainer from '../libraries/Grid/GridContainer'
import appStyle from '../common/styles/app'
import Profile from '../modules/user/containers/Profile'

class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <MenuPage>
        <GridContainer justify='center'>
          <Profile color='primary' match={this.props.match} />
        </GridContainer>
      </MenuPage>
    )
  }
}

export default withStyles(appStyle)(ProfilePage)
