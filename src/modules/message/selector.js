import React from 'react'
import YouTube from 'react-youtube'
import { createSelector } from 'reselect'
import { GOOGLE_API_KEY } from '../../common/models'
import { MODULE_NAME as MODULE_MESSAGE } from './models'
const ReactMarkdown = require('react-markdown')

const getMessages = (state) => {
  const room = state[MODULE_MESSAGE].selected
  return room && (room.id || room.uid)
    ? state[MODULE_MESSAGE].messages[room.id || room.uid] : []
}
const getRoom = (state) => state[MODULE_MESSAGE].selected

export const selectorMessages = createSelector(
  [ getMessages, getRoom ],
  (messages, room) => {
    if (!room || !messages) {
      return []
    }
    return messages.map((item) => {
      try {
        const type = ['text', 'url', 'markdown', 'youtube']
          .includes(item.type)
          ? 'text' : item.type
        const data = item.data
        let text = ''
        let uri = null
        let objectData = {}
        switch (item.type) {
          case 'url':
            text = <a target='_blank' href={data}>{data}</a>
            break
          case 'text':
            text = <p>{data}</p>
            break
          case 'location':
            objectData = JSON.parse(data)
            break
          case 'youtube':
            text = <YouTube
              videoId={`${data}`}
              opts={{
                width: '400',
                playerVars: {
                  autoplay: 0
                }
              }}
            />
            break
          case 'spotify':
            uri = data
            break
          case 'markdown':
            text = <ReactMarkdown source={data} />
            break
          default:
            text = ''
            break
        }
        return {
          ...item,
          title: item.sender ? undefined : room.guestName,
          position: item.sender ? 'right' : 'left',
          type: type,
          messageType: item.type,
          text,
          uri,
          data: objectData,
          apiKey: GOOGLE_API_KEY,
          className: 'message-box-container',
          date: new Date(item.time)
        }
      } catch (err) {
        console.log('err', err)
        return undefined
      }
    }).filter(item => item)
  }
)
