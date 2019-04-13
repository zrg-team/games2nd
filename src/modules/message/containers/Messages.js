import { connect } from 'react-redux'
import { loading, pageLoading } from '../../../common/middlewares/effects'
import storeAccessible from '../../../common/utils/storeAccessible'
import { MODULE_NAME as MODULE_USER } from '../../user/models'
import { MODULE_NAME as MODULE_MESSAGE } from '../../message/models'
import Messages from '../components/Messages'
import { getMessages, readed } from '../repository'
import { setMessages, setCurrentRoom } from '../actions'
import { getRoom } from '../../room/repository'
import { selectorMessages } from '../selector'
import { mapDispatchToProps as chatContainer } from './ChatInput'

let messageListener = null
function parseMessages (data) {
  const docs = []
  // const messages = []
  const { selected, stage } = storeAccessible.getModuleState(MODULE_MESSAGE)
  const { userInformation } = storeAccessible.getModuleState(MODULE_USER)
  if (!selected) {
    return []
  }
  const offset = stage[selected.id] ? stage[selected.id].offset : -1
  let max = offset
  let isReaded = stage[selected.id] ? stage[selected.id].unread : 0
  data.forEach(doc => {
    const item = doc.data()
    const timestamp = item.time
    if (timestamp && timestamp > +offset) {
      max = +max > +timestamp ? +max : +timestamp
      const sender = userInformation.uid === item.from
      isReaded = !sender || isReaded === undefined
        ? undefined : isReaded + 1
      const data = {
        sender,
        from: item.from,
        time: timestamp,
        type: item.type,
        meta: item.meta ? {
          link: item.meta.link
        } : {},
        uid: doc.id
      }
      docs.push({
        ...data,
        data: item.data
      })
    }
  })
  return {
    docs: docs.sort((next, pre) => next.time - pre.time),
    max,
    isReaded
  }
}
const mapDispatchToProps = (dispatch, props) => ({
  getRoom: async (uid) => {
    try {
      const result = await pageLoading(async () => {
        const room = await getRoom(uid)
        if (room) {
          dispatch(setCurrentRoom(room))
          return room
        }
        return undefined
      })
      return result
    } catch (err) {
      return undefined
    }
  },
  getMessages: async (room, offset) => {
    const result = await loading(async () => {
      try {
        let first = true
        if (messageListener) {
          messageListener()
          messageListener = null
        }
        const { data, instance } = await getMessages(room, offset, ({ data }) => {
          if (!first) {
            const { docs, max, isReaded } = parseMessages(data)
            dispatch(setMessages({
              key: room.id || room.uid,
              data: docs,
              offset: max,
              isReaded
            }))
          }
          first = false
        })
        messageListener = instance
        const { docs, max, isReaded } = parseMessages(data)
        readed({ ...room, uid: room.id })
        dispatch(setMessages({
          key: room.id,
          data: docs,
          offset: max,
          isReaded
        }))
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    })
    return result
  },
  ...chatContainer(dispatch, props)
})

const mapStateToProps = state => {
  const selected = state[MODULE_MESSAGE].selected || {}
  return {
    selected,
    user: state[MODULE_USER].userInformation,
    offset: selected.id && state[MODULE_MESSAGE].stage[selected.id]
      ? state[MODULE_MESSAGE].stage[selected.id].offset
      : -1,
    messages: selectorMessages(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
