import { combineReducers } from 'redux'

import post from './slice/post'
import tab from './slice/tab'
import search from './slice/search'
import postDetail from './slice/postDetail'

const rootReducer = combineReducers({
  post,
  tab,
  search,
  postDetail,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
