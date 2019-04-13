import { connect } from 'react-redux'
import { MODULE_NAME as MODULE_SHOP } from '../models'
import ProductList from '../components/ProductList'
import { loading } from '../../../common/middlewares/effects'
import { getProducts } from '../repository'
import { setProducts, setSearchProducts, appendSearchProducts } from '../actions'

export const mapDispatchToProps = (dispatch, props) => ({
  getProducts: async (page, limit, offset = undefined) => {
    const result = await loading(async () => {
      const response = await getProducts(limit, offset)
      if (response) {
        dispatch(setProducts({
          page,
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
  },
  searchProducts: async (limit, offset = undefined, search = undefined) => {
    const result = await loading(async () => {
      const response = await getProducts(limit, offset, search)
      if (response) {
        if (!offset) {
          dispatch(setSearchProducts({
            search,
            searchMode: true,
            data: response.data,
            offset: response.offset,
            end: response.data.length <= 0
          }))
        } else {
          dispatch(appendSearchProducts({
            search,
            searchMode: true,
            data: response.data,
            offset: response.offset,
            end: response.data.length <= 0
          }))
        }
      }
      return response && response.offset
    })
    return result
  }
})

const mapStateToProps = state => {
  return {
    end: state[MODULE_SHOP].end,
    location: state.router.location,
    products: state[MODULE_SHOP].products || {},
    total: state[MODULE_SHOP].total,
    offset: state[MODULE_SHOP].offset,
    search: state[MODULE_SHOP].search,
    totalPage: state[MODULE_SHOP].totalPage,
    searchMode: state[MODULE_SHOP].searchMode,
    searchResult: state[MODULE_SHOP].searchResult || []
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
