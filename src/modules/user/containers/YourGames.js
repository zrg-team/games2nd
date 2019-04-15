import { connect } from 'react-redux'
import YourGames from '../components/YourGames'
import { loading, pageLoading } from '../../../common/middlewares/effects'
import { getProductsByUser, deleteProduct } from '../repository'
import { setYourProducts } from '../actions'
import { MODULE_NAME } from '../models'

export const mapDispatchToProps = (dispatch, props) => ({
  getProductsByUser: async (uid) => {
    const result = await loading(async () => {
      const response = await getProductsByUser(uid)
      if (response) {
        dispatch(setYourProducts(response))
        return true
      }
      return false
    })
    return result
  },
  removeProduct: async (uid) => {
    const result = await pageLoading(async () => {
      const response = await deleteProduct(uid)
      if (response) {
        return true
      }
      return false
    })
    return result
  }
})

const mapStateToProps = state => {
  return {
    user: state[MODULE_NAME].userInformation,
    products: state[MODULE_NAME].products
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YourGames)
