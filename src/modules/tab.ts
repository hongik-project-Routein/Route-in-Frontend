const TABINDEX = 'tab/TABINDEX' as const

export const changeTabIndex = (
  diff: number
): { type: typeof TABINDEX; payload: number } => ({
  type: TABINDEX,
  payload: diff,
})

type TabAction = ReturnType<typeof changeTabIndex>

interface TabState {
  index: number
}

const initialState: TabState = {
  index: 0,
}

function changeTabReducer(
  state: TabState = initialState,
  action: TabAction
): TabState {
  switch (action.type) {
    case TABINDEX:
      return { index: action.payload }
    default:
      return state
  }
}

export default changeTabReducer
