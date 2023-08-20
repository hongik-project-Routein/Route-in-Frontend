import { atom } from 'recoil'

interface TabState {
  navbar: number
  search: number
  profile: number
  explore: number
}

const initialState: TabState = {
  navbar: 0,
  search: 0,
  profile: 0,
  explore: 0,
}

const tab = atom({
  key: 'tab',
  default: initialState,
})

export default tab
