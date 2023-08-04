import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface TabState {
  navbar: number
  search: number
  profile: number
  explore: number
}

const initialState: TabState = {
  navbar: 0,
  search: 0,
  profile: 0,
  explore: 0,
}

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    ChangeNavbarIndex(state: TabState, action: PayloadAction<number>) {
      state.navbar = action.payload
    },
    ChangeSearchTabIndex(state: TabState, action: PayloadAction<number>) {
      state.search = action.payload
    },
    ChangeProfileTabIndex(state: TabState, action: PayloadAction<number>) {
      state.profile = action.payload
    },
    ChangeExploreTabIndex(state: TabState, action: PayloadAction<number>) {
      state.explore = action.payload
    },
  },
})

// reducer and action return
const { reducer, actions } = tabSlice
export const {
  ChangeNavbarIndex,
  ChangeSearchTabIndex,
  ChangeProfileTabIndex,
  ChangeExploreTabIndex,
} = actions
export default reducer
