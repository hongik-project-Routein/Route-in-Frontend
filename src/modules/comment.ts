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
): { type: typeof ENROLLCOMMENT; payload: CommentContent } => ({
  type: ENROLLCOMMENT,
  payload: diff,
})

export const ClickHeartButton = (
  key: string,
  active: boolean
): {
  type: typeof CLICKHEARTBUTTON
  payload: { key: string; active: boolean }
} => ({
  type: CLICKHEARTBUTTON,
  payload: { key, active },
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
      const { key, active } = action.payload

      const updatedComment = state.comment.map((comment) => {
        if (comment.id === key) {
          return {
            ...comment,
            heartCount: active
              ? comment.heartCount + 1
              : comment.heartCount - 1,
          }
        }
        return comment
      })
      return {
        ...state,
        comment: updatedComment,
      }
    }

    default:
      return state
  }
}

export default commentReducer
