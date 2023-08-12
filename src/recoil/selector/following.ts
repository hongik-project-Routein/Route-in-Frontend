import { selector } from 'recoil'
import user, { type UserState } from '../atom/user'

const following = selector<string[]>({
  key: 'following',

  get: ({ get }) => {
    const userInfo: UserState = get(user)
    return userInfo.following_set
  },

  set: ({ set, get }, newValue) => {
    const userInfo: UserState = get(user)
    const newUserInfo = { ...userInfo, following_set: newValue as string[] }
    set(user, newUserInfo)
  },
})

export default following
