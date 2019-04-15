import React from 'react'
import MenuPage from '../common/hocs/MenuPage'
import YourGames from '../modules/user/containers/YourGames'
import GridContainer from '../libraries/Grid/GridContainer'

class YourGamePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <MenuPage marginTop>
        <GridContainer justify='center'>
          <YourGames color='primary' match={this.props.match} />
        </GridContainer>
      </MenuPage>
    )
  }
}

export default YourGamePage
