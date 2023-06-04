import { type PostSendToBackend, type Pin } from '../types/postTypes'
import { request } from '../util/axios'

const ENROLLIMAGE = 'post/ENROLLIMAGE' as const
// const STYLEDIMAGE = 'post/STYLEDIMAGE' as const
const CHANGEPLACE = 'post/CHANGEPLACE' as const
const CHANGEHASHTAGANDTEXT = 'post/CHANGEHASHTAGANDTEXT' as const
const SENDTOBACKEND = 'post/SENDTOBACKEND' as const

interface HashtagAndText {
  hashtag: string[]
  text: string
}

export const EnrollImages = (
  pins: Pin[],
  imgUrls: string[]
): {
  type: typeof ENROLLIMAGE
  payload: { pins: Pin[]; imgUrls: string[] }
} => {
  return {
    type: ENROLLIMAGE,
    payload: { pins, imgUrls },
  }
}

export const ChangeHashtagAndText = (
  pins: Pin[],
  hashtagAndText: HashtagAndText
): {
  type: typeof CHANGEHASHTAGANDTEXT
  payload: { pins: Pin[]; hashtagAndText: HashtagAndText }
} => ({
  type: CHANGEHASHTAGANDTEXT,
  payload: { pins, hashtagAndText },
})

export const ChangePlace = (
  pins: Pin[],
  imgUrls: string[]
): {
  type: typeof CHANGEPLACE
  payload: { pins: Pin[]; imgUrls: string[] }
} => {
  return {
    type: CHANGEPLACE,
    payload: { pins, imgUrls },
  }
}

export const SavePost = (
  diff: PostSendToBackend
): { type: typeof SENDTOBACKEND; payload: PostSendToBackend } => {
  const sendData = request<boolean>('post', 'postdata', diff)
  console.log(sendData)

  return {
    type: SENDTOBACKEND,
    payload: diff,
  }
}

// 모든 액션 객체들에 대한 타입 준비
type PostAction =
  | ReturnType<typeof EnrollImages>
  | ReturnType<typeof ChangeHashtagAndText>
  | ReturnType<typeof ChangePlace>
  | ReturnType<typeof SavePost>

interface PostState {
  pins: Pin[]
  hashtagAndText: HashtagAndText
  imgUrls: string[]
}

const initialState: PostState = {
  pins: [],
  hashtagAndText: {
    hashtag: [],
    text: '',
  },
  imgUrls: [],
}

function changePostReducer(
  state: PostState = initialState,
  action: PostAction
): PostState {
  switch (action.type) {
    case ENROLLIMAGE:
      return {
        pins: action.payload.pins,
        hashtagAndText: { hashtag: [], text: '' },
        imgUrls: action.payload.imgUrls,
      }
    case CHANGEHASHTAGANDTEXT:
      return {
        pins: action.payload.pins,
        hashtagAndText: action.payload.hashtagAndText,
        imgUrls: state.imgUrls,
      }
    case CHANGEPLACE:
      return {
        pins: action.payload.pins,
        hashtagAndText: { hashtag: [], text: '' },
        imgUrls: action.payload.imgUrls,
      }
    case SENDTOBACKEND:
      return state
    default:
      return state
  }
}

export default changePostReducer
