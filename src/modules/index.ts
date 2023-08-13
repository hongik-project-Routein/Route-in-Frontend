import { combineReducers } from 'redux'

import post from './slice/post'
import tab from './slice/tab'
import search from './slice/search'

const rootReducer = combineReducers({
  post,
  tab,
  search,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
