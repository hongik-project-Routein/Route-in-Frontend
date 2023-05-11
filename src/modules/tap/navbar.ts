const NAVBARINDEX = 'navbar/NAVBARINDEX' as const

export const changeNavbarIndex = (
  diff: number
): { type: typeof NAVBARINDEX; payload: number } => ({
  type: NAVBARINDEX,
  payload: diff,
})

type NavbarAction = ReturnType<typeof changeNavbarIndex>

interface NavbarState {
  index: number
}

const initialState: NavbarState = {
  index: 0,
}

function changeNavbarReducer(
  state: NavbarState = initialState,
  action: NavbarAction
): NavbarState {
  switch (action.type) {
    case NAVBARINDEX:
      return { index: action.payload }
    default:
      return state
  }
}

export default changeNavbarReducer
