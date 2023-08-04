import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface UserState {
  name: string
  nickname: string
  email: string
  age: number
  gender: string
  image: string
  follower_set: string[]
  following_set: string[]
  last_login: Date
  joined_at: Date
  accessToken: string
}

const initialState: UserState = {
  name: '',
  nickname: '',
  email: '',
  age: 0,
  gender: '',
  image: '',
  follower_set: [],
  following_set: [],
  last_login: new Date(),
  joined_at: new Date(),
  accessToken: '',
}

interface LoginPayload {
  name: string
  nickname: string
  email: string
  age: number
  gender: string
  accessToken: string
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    Login(state: UserState, action: PayloadAction<LoginPayload>) {
      state.name = action.payload.name
      state.nickname = action.payload.nickname
      state.email = action.payload.email
      state.age = action.payload.age
      state.gender = action.payload.gender
      state.accessToken = action.payload.accessToken
    },
    Logout(state: UserState) {
      state.name = ''
      state.nickname = ''
      state.email = ''
      state.age = 0
      state.gender = ''
      state.image = ''
      state.follower_set = []
      state.following_set = []
      state.last_login = new Date()
      state.joined_at = new Date()
      state.accessToken = ''
    },
  },
})

const { reducer, actions } = userSlice
export const { Login, Logout } = actions
export default reducer
