import { atom } from 'recoil'
import { type UpdatePost } from '../../types/postTypes'

const updatePost = atom<UpdatePost>({
  key: 'updatePost',
  default: {
    content: '',
    pins: [],
  },
})

export const isUpdatePost = atom<boolean>({
  key: 'isUpdatePost',
  default: false,
})

export const curPinIndex = atom<number>({
  key: 'curPinIndex',
  default: 0,
})

export default updatePost
