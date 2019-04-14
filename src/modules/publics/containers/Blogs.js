import { connect } from 'react-redux'
import Blogs from '../components/Blogs'
import { loading } from '../../../common/middlewares/effects'
import { getBlogs } from '../repository'
import { appendBlogs, setBlogs } from '../actions'
import { MODULE_NAME, BLOG_LIMIT } from '../models'

const mapDispatchToProps = (dispatch, props) => ({
  getBlogs: async (offset = undefined) => {
    const result = await loading(async () => {
      const response = await getBlogs(offset, BLOG_LIMIT)
      if (response && !offset) {
        dispatch(setBlogs(response.data))
      } else if (response && offset) {
        dispatch(appendBlogs(response.data))
      }
      if (response && response.data.length) {
        return { next: true, offset: response.offset }
      } else if (response && !response.data.length) {
        return { next: false, offset: response.offset }
      }
      return null
    })
    return result
  }
})

const mapStateToProps = state => {
  return {
    blogs: state[MODULE_NAME].blogs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)
