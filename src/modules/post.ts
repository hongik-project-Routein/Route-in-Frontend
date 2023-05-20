import { type Post } from '../types/postTypes'

const ENROLLIMAGE = 'post/ENROLLIMAGE' as const
// const STYLEDIMAGE = 'post/STYLEDIMAGE' as const
const CHANGEHASHTAGANDTEXT = 'post/CHANGEHASHTAGANDTEXT' as const

interface HashtagAndText {
  hashtag: string[]
  text: string
}

export const EnrollImages = (
  diff: Post[]
): { type: typeof ENROLLIMAGE; payload: Post[] } => ({
  type: ENROLLIMAGE,
  payload: diff,
})

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

// 모든 액션 객체들에 대한 타입 준비
type PostAction =
  | ReturnType<typeof EnrollImages>
  | ReturnType<typeof ChangeHashtagAndText>

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
    default:
      return state
  }
}

export default changePostReducer
