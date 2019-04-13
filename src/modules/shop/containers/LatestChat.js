import { connect } from 'react-redux'
import { MODULE_NAME as MODULE_SHOP } from '../models'
import LatestChat from '../components/LatestChat'

const mapDispatchToProps = (dispatch, props) => ({
})

const mapStateToProps = state => {
  return {
    presents: state[MODULE_SHOP].presents || {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LatestChat)
