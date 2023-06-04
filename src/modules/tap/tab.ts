const SEARCHTABINDEX = 'searchTab/TABINDEX' as const

export const changeSearchTabIndex = (
  diff: number
): { type: typeof SEARCHTABINDEX; payload: number } => ({
  type: SEARCHTABINDEX,
  payload: diff,
})

type TabAction = ReturnType<typeof changeSearchTabIndex>

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
    case SEARCHTABINDEX:
      return { index: action.payload }
    default:
      return state
  }
}

export default changeTabReducer
