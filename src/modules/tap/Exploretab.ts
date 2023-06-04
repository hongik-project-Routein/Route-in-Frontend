const EXPLORETABINDEX = 'ExploreTab/TABINDEX' as const

export const changeExploreTabIndex = (
  diff: number
): { type: typeof EXPLORETABINDEX; payload: number } => ({
  type: EXPLORETABINDEX,
  payload: diff,
})

type ExploreTabAction = ReturnType<typeof changeExploreTabIndex>

interface ExploreTabState {
  index: number
}

const initialState: ExploreTabState = {
  index: 0,
}

function changeExploreTabReducer(
  state: ExploreTabState = initialState,
  action: ExploreTabAction
): ExploreTabState {
  switch (action.type) {
    case EXPLORETABINDEX:
      return { index: action.payload }
    default:
      return state
  }
}

export default changeExploreTabReducer
