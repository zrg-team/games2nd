import { connect } from 'react-redux'
import { MODULE_NAME as MODULE_SHOP, LIMIT_HOME_PAGE } from '../models'
import NewArrivals from '../components/NewArrivals'
import { loading } from '../../../common/middlewares/effects'
import { getProducts } from '../repository'
import { setProducts } from '../actions'

export const mapDispatchToProps = (dispatch, props) => ({
  getNewsProducts: async () => {
    const result = await loading(async () => {
      const response = await getProducts(LIMIT_HOME_PAGE, undefined)
      if (response) {
        dispatch(setProducts({
          page: 'new',
          offset: response.offset,
          search: false,
          data: response.data,
          total: response.total,
          totalPage: response.totalPage
        }))
      }
      return response && response.offset
    })
    return result
  }
})

const mapStateToProps = state => {
  return {
    products: state[MODULE_SHOP].products || {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArrivals)
