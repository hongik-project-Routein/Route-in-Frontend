import { atom } from 'recoil'
import { type UserData } from '../../types/userType'

const profileStore = atom<UserData>({
  key: 'profile',
  default: {
    uname: '',
    id: 0,
    last_login: '1',
    email: '',
    name: '',
    introduction: '',
    age: 0,
    image: '',
    following_set: [],
    follower_set: [],
    post_set: [],
  },
})

export default profileStore
