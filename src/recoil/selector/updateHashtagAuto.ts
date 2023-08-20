import { selector } from 'recoil'
import updatePost, { curPinIndex } from '../atom/updatePost'
import { type UpdatePin } from '../../types/postTypes'

const updatePin = selector<UpdatePin>({
  key: 'updateHashTagAuto',

  get: ({ get }) => {
    const curPost = get(updatePost)
    const curPin = get(curPinIndex)
    return curPost.pins[curPin]
  },

  set: ({ set, get }, newValue) => {
    const post = get(updatePost)
    const curPin = get(curPinIndex)
    const newPins = { ...post }
  },
})
