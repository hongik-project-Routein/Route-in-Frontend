import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export enum Category {
  POST = 'post',
  PIN = 'pin',
  MAP = 'map',
  USER = 'user',
}

interface SearchState {
  keyword: string
  category: Category
}

const initialState: SearchState = {
  keyword: '',
  category: Category.POST,
}

interface ChangeKeywordPayload {
  keyword: string
}

interface ChangeCategoryPayload {
  category: Category
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    ChangeKeyword(
      state: SearchState,
      action: PayloadAction<ChangeKeywordPayload>
    ) {
      state.keyword = action.payload.keyword
    },
    ChangeCategory(
      state: SearchState,
      action: PayloadAction<ChangeCategoryPayload>
    ) {
      state.category = action.payload.category
    },
  },
})

const { reducer, actions } = searchSlice
export const { ChangeKeyword, ChangeCategory } = actions
export default reducer
