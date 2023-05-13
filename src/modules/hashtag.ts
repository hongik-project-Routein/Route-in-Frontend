const CHANGEHASHTAG = 'post/CHANGEHASHTAG' as const

export const changeHashtag = (
  diff: string[]
): { type: typeof CHANGEHASHTAG; payload: string[] } => ({
  type: CHANGEHASHTAG,
  payload: diff,
})

type ChangeHashtagAction = ReturnType<typeof changeHashtag>

interface HashtagState {
  data: string[]
}

const initialState: HashtagState = {
  data: ['#김포공항', '#제주', '#제주공항', '#스카이'],
}

function changeHashtagReducer(
  state: HashtagState = initialState,
  action: ChangeHashtagAction
): HashtagState {
  switch (action.type) {
    case CHANGEHASHTAG:
      return { data: action.payload }
    default:
      return state
  }
}

export default changeHashtagReducer
