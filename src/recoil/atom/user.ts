import { atom } from 'recoil'
import localStorageEffect from '../localStorageEffect'

export interface UserState {
  name: string
  uname: string
  email: string
  age: number
  gender: string
  image: string
  follower_set: string[]
  following_set: string[]
  accessToken: string
}

const user = atom<UserState>({
  key: 'user',
  default: {
    name: '',
    uname: '',
    email: '',
    age: 0,
    gender: '',
    image: '',
    follower_set: [],
    following_set: [],
    accessToken: '',
  },
  effects: [localStorageEffect('user')],
})

export default user
