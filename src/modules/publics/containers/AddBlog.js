import { connect } from 'react-redux'
import AddBlog from '../components/AddBlog'
import { MODULE_NAME as MODULE_USER } from '../../user/models'
import { pageLoading } from '../../../common/middlewares/effects'
import { postBlog } from '../repository'

const mapDispatchToProps = (dispatch, props) => ({
  postBlog: async (user, data) => {
    try {
      const div = document.createElement('div')
      div.innerHTML = data.content
      const text = div.textContent || div.innerText || ''
      const result = await pageLoading(async () => {
        const blog = await postBlog({
          user: user.id || user.uid,
          description: `${text.substring(0, 256)} ...`,
          ...data
        })
        if (blog) {
          return data
        }
        return undefined
      })
      return result
    } catch (err) {
      return undefined
    }
  }
})

const mapStateToProps = state => {
  return {
    user: state[MODULE_USER].userInformation
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBlog)
