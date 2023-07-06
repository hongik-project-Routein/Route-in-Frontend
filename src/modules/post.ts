import {
  type PostSendToBackend,
  type Pin,
  type PostSendToBackType,
} from '../types/postTypes'
import { coordinatePostSendType } from './types/sendPost'
import axios from 'axios'

const ENROLLIMAGE = 'post/ENROLLIMAGE' as const
const CHANGEPLACE = 'post/CHANGEPLACE' as const
const CHANGEHASHTAGANDTEXT = 'post/CHANGEHASHTAGANDTEXT' as const
const SENDTOBACKEND = 'post/SENDTOBACKEND' as const

interface HashtagAndText {
  hashtag: string[]
  text: string
}

// 처음에 사용자가 사진을 등록했을 때 실행되는 액션
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

// 해시태그와 글, 자동해시태그에 대한 것이 변동되었을 때 액션
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

// 사진 선택을 완료하고 다음버튼을 눌렀을 때
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

// 게시글을 저장할 때 쓰는 액션
export const SavePost = (
  diff: PostSendToBackend
): { type: typeof SENDTOBACKEND; payload: PostSendToBackend } => {
  const sendData: PostSendToBackType = coordinatePostSendType(diff)

  const formData = new FormData()
  formData.append('content', sendData.content)

  // 파일을 보낼 때는 폼데이터로 보내야한다.
  sendData.pins.forEach((pin, index) => {
    formData.append(`pins[${index}]image`, pin.image, pin.image.name) // File 객체를 직접 추가
    formData.append(`pins[${index}]pin_hashtag`, pin.pin_hashtag)
    formData.append(`pins[${index}]content`, pin.content)
    formData.append(`pins[${index}]latitude`, pin.latitude.toString())
    formData.append(`pins[${index}]longitude`, pin.longitude.toString())
    formData.append(`pins[${index}]mapID`, pin.mapID)
  })

  axios
    .post('http://localhost:8000/api/post/create/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })

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
