import { connect } from 'react-redux'
import Blog from '../components/Blog'
import { loading } from '../../../common/middlewares/effects'
import { getBlog } from '../repository'

const mapDispatchToProps = (dispatch, props) => ({
  getBlog: async (uid) => {
    const result = await loading(async () => {
      const response = await getBlog(uid)
      return response
    })
    return result
  }
})

const mapStateToProps = (state, props) => {
  const { match: { params } } = props
  return {
    uid: params.uid,
    location: state.router.location
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
