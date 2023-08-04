import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface FollowState {
  nickname: string
  follower: string[]
  following: string[]
}

const initialState: FollowState = {
  nickname: '',
  follower: [],
  following: [],
}

interface FollowerPayload {
  nickname: string
  follower: string
}

interface FollowingPayload {
  nickname: string
  following: string
}

const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {
    LoadFollowList(state: FollowState, action: PayloadAction<FollowState>) {
      state.nickname = action.payload.nickname
      state.follower = action.payload.follower
      state.following = action.payload.following
    },
    AddFollower(state: FollowState, action: PayloadAction<FollowerPayload>) {
      state.nickname = action.payload.nickname
      state.follower = [...state.follower, action.payload.follower]
    },
    DeleteFollower(state: FollowState, action: PayloadAction<FollowerPayload>) {
      state.nickname = action.payload.nickname
      state.follower = [...state.follower].filter(
        (user) => user !== action.payload.follower
      )
    },
    AddFollowing(state: FollowState, action: PayloadAction<FollowingPayload>) {
      state.nickname = action.payload.nickname
      state.following = [...state.following, action.payload.following]
    },
    DeleteFollowing(
      state: FollowState,
      action: PayloadAction<FollowingPayload>
    ) {
      state.nickname = action.payload.nickname
      state.following = [...state.following].filter(
        (user) => user !== action.payload.following
      )
    },
  },
})

const { reducer, actions } = followSlice
export const {
  LoadFollowList,
  AddFollower,
  DeleteFollower,
  AddFollowing,
  DeleteFollowing,
} = actions
export default reducer
