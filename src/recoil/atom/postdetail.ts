import { atom } from 'recoil'
import { type LoadPost } from '../../types/postTypes'

const postdetail = atom<LoadPost>({
  key: 'postdetail',
  default: {
    post: {
      id: 0,
      writer: '',
      content: '',
      pin_count: 0,
      like_count: 0,
      is_liked: false,
      is_bookmarked: false,
      like_users: [],
      bookmark_users: [],
      comment_count: 0,
      created_at: '',
    },
    pin: [],
    user: {
      image: '',
    },
    comment: [],
  },
})

export default postdetail
