import { MODULE_NAME as MODULE_USER } from './user/models'
import { MODULE_NAME as MODULE_ROOM } from './room/models'
import { MODULE_NAME as MODULE_PUBLIC } from './publics/models'
import { MODULE_NAME as MODULE_MESSAGE } from './message/models'
import { MODULE_NAME as MODULE_SHOP } from './shop/models'
import userReducers from './user/reducers'
import roomReducers from './room/reducers'
import publicsReducers from './publics/reducers'
import messageReducers from './message/reducers'
import shopReducers from './shop/reducers'

export default {
  [MODULE_USER]: userReducers,
  [MODULE_ROOM]: roomReducers,
  [MODULE_PUBLIC]: publicsReducers,
  [MODULE_MESSAGE]: messageReducers,
  [MODULE_SHOP]: shopReducers
}
