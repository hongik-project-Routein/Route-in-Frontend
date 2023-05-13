import { combineReducers } from 'redux'
import changeNavbarReducer from './tap/navbar'
import changeTabReducer from './tap/tab'
import changeExploreTabReducer from './tap/Exploretab'
import changeProfileTabReducer from './tap/profiletab'
import changeIntroductionReducer from './profile'
import changeHashtagReducer from './hashtag'
const rootReducer = combineReducers({
  changeNavbarReducer,
  changeTabReducer,
  changeExploreTabReducer,
  changeProfileTabReducer,
  changeIntroductionReducer,
  changeHashtagReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
