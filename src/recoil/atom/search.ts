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
    category: Category.POST,
  },
})

export default search
