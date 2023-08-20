import { selector } from 'recoil'
import user, { type UserState } from '../atom/user'

const follower = selector<string[]>({
  key: 'follower',

  get: ({ get }) => {
    const userInfo: UserState = get(user)
    return userInfo.follower_set
  },

  set: ({ set, get }, newValue) => {
    const userInfo: UserState = get(user)
    const newUserInfo = { ...userInfo, follower_set: newValue as string[] }
    set(user, newUserInfo)
  },
})

export default follower
