const CHANGEINTRODUCTION = 'profile/CHANGEINTRODUCTION' as const

export const changeIntroduction = (
  diff: string
): { type: typeof CHANGEINTRODUCTION; payload: string } => ({
  type: CHANGEINTRODUCTION,
  payload: diff,
})

type ChangeIntroductionAction = ReturnType<typeof changeIntroduction>

interface IntroductionState {
  data: string
}

const initialState: IntroductionState = {
  data: `김진호
홍익대학교 경영학과`,
}

function changeIntroductionReducer(
  state: IntroductionState = initialState,
  action: ChangeIntroductionAction
): IntroductionState {
  switch (action.type) {
    case CHANGEINTRODUCTION:
      return { data: action.payload }
    default:
      return state
  }
}

export default changeIntroductionReducer
