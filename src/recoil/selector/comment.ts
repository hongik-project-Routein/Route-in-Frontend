import { selector } from 'recoil'
import { type LoadComment } from '../../types/postTypes'
import postdetail from '../atom/postdetail'

const comment = selector<LoadComment[]>({
  key: 'comment',

  get: ({ get }) => {
    const post = get(postdetail)
    return post.comment
  },

  set: ({ set, get }, newValue) => {
    const post = get(postdetail)
    const newPost = { ...post, comment: newValue as LoadComment[] }
    set(postdetail, newPost)
  },
})

export default comment
