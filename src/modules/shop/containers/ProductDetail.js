import { connect } from 'react-redux'
import ProductDetail from '../components/ProductDetail'
import { loading } from '../../../common/middlewares/effects'
import { getProduct } from '../repository'
import { getUser } from '../../user/repository'
import { MODULE_NAME as MODULE_USER } from '../../user/models'

export const mapDispatchToProps = (dispatch, props) => ({
  getProduct: async (uid) => {
    const result = await loading(async () => {
      const response = await getProduct(uid)
      return response
    })
    return result
  },
  getShopInformation: async (uid) => {
    try {
      let user = await getUser({
        uid
      })
      if (!user) {
        return undefined
      }
      return user
    } catch (err) {
      console.log('get err', err)
      return undefined
    }
  }
})

const mapStateToProps = (state, props) => {
  const { match: { params } } = props
  return {
    uid: params.uid,
    location: state.router.location,
    user: state[MODULE_USER].userInformation || {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
