import { atom } from 'recoil'

export enum Category {
  POST = 'post',
  PIN = 'pin',
  USER = 'user',
}

interface SearchState {
  keyword: string
  category: Category
}

const search = atom<SearchState>({
  key: 'search',
  default: {
    keyword: '',
    category: Category.PIN,
  },
})

export default search
