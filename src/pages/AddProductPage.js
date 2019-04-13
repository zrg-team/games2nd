import React from 'react'
import MenuPage from '../common/hocs/MenuPage'
import AddProduct from '../modules/shop/containers/AddProduct'
import GridContainer from '../libraries/Grid/GridContainer'

class AddProductPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <MenuPage marginTop={false}>
        <GridContainer justify='center'>
          <AddProduct color='primary' match={this.props.match} />
        </GridContainer>
      </MenuPage>
    )
  }
}

export default AddProductPage
