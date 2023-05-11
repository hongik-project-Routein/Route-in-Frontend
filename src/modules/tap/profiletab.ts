const PROFILETABINDEX = 'profile/TABINDEX' as const

export const changeProfileTabIndex = (
  diff: number
): { type: typeof PROFILETABINDEX; payload: number } => ({
  type: PROFILETABINDEX,
  payload: diff,
})

type ProfileTabAction = ReturnType<typeof changeProfileTabIndex>

interface ProfileTabState {
  index: number
}

const initialState: ProfileTabState = {
  index: 0,
}

function changeProfileTabReducer(
  state: ProfileTabState = initialState,
  action: ProfileTabAction
): ProfileTabState {
  switch (action.type) {
    case PROFILETABINDEX:
      return { index: action.payload }
    default:
      return state
  }
}

export default changeProfileTabReducer
