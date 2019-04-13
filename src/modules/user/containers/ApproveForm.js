import { connect } from 'react-redux'
import ApproveForm from '../components/ApproveForm'

const mapDispatchToProps = (dispatch, props) => ({
  unlock: async (password) => {
    return true
  }
})

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ApproveForm)
