import { combineReducers } from 'redux'
import changeNavbarReducer from './navbar'
import changeTabReducer from './tab'

const rootReducer = combineReducers({
  changeNavbarReducer,
  changeTabReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
