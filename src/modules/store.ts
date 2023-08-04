import {
  type Action,
  type ThunkDispatch,
  configureStore,
} from '@reduxjs/toolkit'
import rootReducer, { type RootState } from '.'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export type AppThunkDispatch = ThunkDispatch<RootState, any, Action<string>> // 비동기 디스패치
export type AppDispatch = typeof store.dispatch // 일반 디스패치
export default store
