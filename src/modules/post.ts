import { type PostSendToBackend, type Post } from '../types/postTypes'
import { request } from '../util/axios'
// import { request } from '../util/axios'

const ENROLLIMAGE = 'post/ENROLLIMAGE' as const
// const STYLEDIMAGE = 'post/STYLEDIMAGE' as const
const CHANGEHASHTAGANDTEXT = 'post/CHANGEHASHTAGANDTEXT' as const
const SENDTOBACKEND = 'post/SENDTOBACKEND' as const

interface HashtagAndText {
  hashtag: string[]
  text: string
}

export const EnrollImages = (
  diff: Post[]
): { type: typeof ENROLLIMAGE; payload: Post[] } => {
  return {
    type: ENROLLIMAGE,
    payload: diff,
  }
}

export const ChangeHashtagAndText = (
  posts: Post[],
  hashtagAndText: HashtagAndText
): {
  type: typeof CHANGEHASHTAGANDTEXT
  payload: { posts: Post[]; hashtagAndText: HashtagAndText }
} => ({
  type: CHANGEHASHTAGANDTEXT,
  payload: { posts, hashtagAndText },
})

export const SavePost = (
  diff: PostSendToBackend
): { type: typeof SENDTOBACKEND; payload: PostSendToBackend } => {
  const sendData = request<PostSendToBackend>('post', 'postdata', diff)
  console.log(sendData)

  return {
    type: SENDTOBACKEND,
    payload: diff,
  }
}

// 모든 액션 객체들에 대한 타입 준비
type PostAction =
  | ReturnType<typeof EnrollImages>
  | ReturnType<typeof ChangeHashtagAndText>
  | ReturnType<typeof SavePost>

interface PostState {
  post: Post[]
  hashtagAndText: HashtagAndText
}

const initialState: PostState = {
  post: [],
  hashtagAndText: {
    hashtag: [],
    text: '',
  },
}

function changePostReducer(
  state: PostState = initialState,
  action: PostAction
): PostState {
  switch (action.type) {
    case ENROLLIMAGE:
      return { post: action.payload, hashtagAndText: { hashtag: [], text: '' } }
    case CHANGEHASHTAGANDTEXT:
      return {
        post: action.payload.posts,
        hashtagAndText: action.payload.hashtagAndText,
      }
    case SENDTOBACKEND:
      return state
    default:
      return state
  }
}

export default changePostReducer
