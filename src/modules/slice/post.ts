import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type HashtagAndText, type Pin } from '../../types/postTypes'
import { SavePost } from '../async/savePost'

// 초기 상태 타입
interface PostState {
  pins: Pin[]
  hashtagAndText: HashtagAndText
  imgUrls: string[]
}

// 초기 상태
const initialState: PostState = {
  pins: [],
  hashtagAndText: {
    hashtag: [],
    text: '',
  },
  imgUrls: [],
}

interface EnrollImagesPayload {
  pins: Pin[]
  imgUrls: string[]
}

interface ChangePlacePayload {
  pins: Pin[]
  imgUrls: string[]
}

interface ChangeHashtagAndTextPayload {
  pins: Pin[]
  hashtagAndText: HashtagAndText
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    EnrollImages(state: PostState, action: PayloadAction<EnrollImagesPayload>) {
      state.pins = action.payload.pins
      state.hashtagAndText = { hashtag: [], text: '' }
      state.imgUrls = action.payload.imgUrls
    },
    ChangePlace(state: PostState, action: PayloadAction<ChangePlacePayload>) {
      state.pins = action.payload.pins
      state.hashtagAndText = { hashtag: [], text: '' }
      state.imgUrls = action.payload.imgUrls
    },
    ChangeHashtagAndText(
      state: PostState,
      action: PayloadAction<ChangeHashtagAndTextPayload>
    ) {
      state.pins = action.payload.pins
      state.hashtagAndText = action.payload.hashtagAndText
    },
  },
  extraReducers: (builder) => {
    // 전송에 성공했으면 상태 초기화
    builder.addCase(SavePost.fulfilled, (state: PostState) => {
      // state.pins = []
      // state.hashtagAndText = {
      //   hashtag: [],
      //   text: '',
      // }
      // state.imgUrls = []
    })
  },
})

// reducer and action return
const { reducer, actions } = postSlice
export const { EnrollImages, ChangePlace, ChangeHashtagAndText } = actions
export default reducer
