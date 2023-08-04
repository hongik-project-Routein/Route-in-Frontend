import { combineReducers } from 'redux'
// import changeNavbarReducer from './tap/navbar'
// import changeTabReducer from './tap/tab'
// import changeExploreTabReducer from './tap/Exploretab'
// import changeProfileTabReducer from './tap/profiletab'
// import changeIntroductionReducer from './profile'
// import changePostReducer from './post'
// import commentReducer from './comment'

import post from './slice/post'
import tab from './slice/tab'
import user from './slice/user'
import search from './slice/search'
import postDetail from './slice/postDetail'
import follow from './slice/follow'

const rootReducer = combineReducers({
  post,
  tab,
  user,
  search,
  postDetail,
  follow,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
