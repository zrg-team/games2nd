import { connect } from 'react-redux'
import { MODULE_NAME as MODULE_USER } from '../../user/models'
import { MODULE_NAME as MODULE_SHOP } from '../models'
import HeaderStore from '../components/HeaderStore'
import { signOut } from '../../../common/utils/authentication'
import { loading } from '../../../common/middlewares/effects'
import { getPresents } from '../repository'
import { setPresentInfo } from '../actions'

const mapDispatchToProps = (dispatch, props) => ({
  signOut: () => {
    signOut()
  },
  getPresentInformation: async () => {
    const result = await loading(async () => {
      const response = await getPresents()
      if (response) {
        dispatch(setPresentInfo(response))
      }
      return response
    })
    return result
  }
})

const mapStateToProps = state => {
  return {
    user: state[MODULE_USER].userInformation,
    presents: state[MODULE_SHOP].presents
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderStore)
