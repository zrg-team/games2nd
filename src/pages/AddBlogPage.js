import React from 'react'
import MenuPage from '../common/hocs/MenuPage'
import AddBlog from '../modules/publics/containers/AddBlog'
import GridContainer from '../libraries/Grid/GridContainer'

class AddBlogPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <MenuPage marginTop>
        <GridContainer justify='center'>
          <AddBlog color='primary' match={this.props.match} />
        </GridContainer>
      </MenuPage>
    )
  }
}

export default AddBlogPage
