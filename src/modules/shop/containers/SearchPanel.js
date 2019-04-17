import { connect } from 'react-redux'
import SearchPanel from '../components/SearchPanel'
import { getGreatDeals } from '../repository'
import { setGreatDeals } from '../actions'
import { MODULE_NAME } from '../models'
import { mapDispatchToProps as productListmapDispatchToProps } from './ProductList'

export const mapDispatchToProps = (dispatch, props) => ({
  getGreatDeals: () => {
    getGreatDeals()
    .then((result) => {
      if (result) {
        dispatch(setGreatDeals(result))
      }
    })
  },
  ...productListmapDispatchToProps(dispatch, props)
})

const mapStateToProps = state => {
  return {
    location: state.router.location,
    deals: state[MODULE_NAME].deals
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel)
