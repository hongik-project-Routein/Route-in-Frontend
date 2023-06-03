import { request } from '../util/axios'

const ENROLLCOMMENT = 'comment/ENROLLCOMMENT' as const
const CLICKHEARTBUTTON = 'comment/CLICKHEARTBUTTON' as const

interface CommentContent {
  id: string
  image: string
  commentWriter: string
  comment: string
  time: number
  heartCount: number
  isHeartButtonClick: boolean
}

export const EnrollCommentAction = (
  diff: CommentContent
): { type: typeof ENROLLCOMMENT; payload: CommentContent } => {
  const sendComment = request<boolean>('post', 'enrollcomment', diff)
  console.log(sendComment)

  return {
    type: ENROLLCOMMENT,
    payload: diff,
  }
}

export const ClickHeartButton = (
  key: string,
  comment: CommentContent
): {
  type: typeof CLICKHEARTBUTTON
  payload: { key: string; comment: CommentContent }
} => ({
  type: CLICKHEARTBUTTON,
  payload: { key, comment },
})

type CommentAction =
  | ReturnType<typeof EnrollCommentAction>
  | ReturnType<typeof ClickHeartButton>

interface CommentState {
  comment: CommentContent[]
}

const initialState: CommentState = {
  comment: [],
}

function commentReducer(
  state: CommentState = initialState,
  action: CommentAction
): CommentState {
  switch (action.type) {
    case ENROLLCOMMENT:
      return { comment: [...state.comment, action.payload] }
    case CLICKHEARTBUTTON: {
      const updatedHeart = state.comment.map((comment) => {
        if (comment.id === action.payload.key) {
          return {
            ...comment,
            heartCount: action.payload.comment.heartCount,
            isHeartButtonClick: action.payload.comment.isHeartButtonClick,
          }
        }
        return comment
      })
      return {
        ...state,
        comment: updatedHeart,
      }
    }
    default:
      return state
  }
}

export default commentReducer
