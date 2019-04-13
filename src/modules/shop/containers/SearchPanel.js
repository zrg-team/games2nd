import { connect } from 'react-redux'
import SearchPanel from '../components/SearchPanel'
import { mapDispatchToProps as productListmapDispatchToProps } from './ProductList'

export const mapDispatchToProps = (dispatch, props) => ({
  ...productListmapDispatchToProps(dispatch, props)
})

const mapStateToProps = state => {
  return {
    location: state.router.location
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel)
