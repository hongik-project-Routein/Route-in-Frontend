import { atom } from 'recoil'
import { type HashtagAndText, type Pin } from '../../types/postTypes'

interface PostState {
  pins: Pin[]
  hashtagAndText: HashtagAndText
  imgUrls: string[]
}

// 초기 상태
const initialState: PostState = {
  pins: [],
  hashtagAndText: {
    hashtag: [],
    text: '',
  },
  imgUrls: [],
}

const post = atom({
  key: 'post',
  default: initialState,
})

export default post
