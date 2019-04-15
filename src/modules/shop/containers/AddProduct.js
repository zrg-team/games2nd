import { connect } from 'react-redux'
import { MODULE_NAME as MODULE_USER } from '../../user/models'
import AddProduct from '../components/AddProduct'
import { loading } from '../../../common/middlewares/effects'
import { addProduct } from '../repository'

const mapDispatchToProps = (dispatch, props) => ({
  addProduct: async (data) => {
    const result = await loading(async () => {
      const response = await addProduct(data)
      return response
    })
    return result
  }
})

const mapStateToProps = state => {
  return {
    user: state[MODULE_USER].userInformation,
    products: state[MODULE_USER].products
      ? state[MODULE_USER].products.length || 0
      : 0
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
