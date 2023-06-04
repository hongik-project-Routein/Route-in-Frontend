export interface Pin {
  picture: File
  hashtagAuto: HashtagAutoAndText
  LatLng: { lat: number; lng: number }
  placeId: number
}

export interface HashtagAutoAndText {
  hashtagAuto: string
  text: string
}

export interface PostSendToBackend {
  text: string
  pins: Pin[]
}

export interface LoadPostMainPage {
  postId: string
  writer: string
  profile: string
  postText: string

  pinCount: number
  pinImage: string[]
  latLng: Array<{ lat: number; lng: number }>

  likeUsers: number
  bookmark: boolean
  taggedUsers?: string[]

  commentCount: number
}

export interface LoadPostFromBack {
  post: {
    id: number
    writer: string
    content: string
    pin_count: number
    like_count: number
    like_users: string[]
    bookmark_users: string[]
    comment_count: number
  }
  pin: PinFromBack[]
  user: {
    image: string
  }
  comment: CommentFromBack[]
}

interface CommentFromBack {
  id: number
  updated_at: string
  post: number
  writer: string
  content: string
  like_count: number
}

interface PinFromBack {
  image: string
  latitude: number
  longitude: number
}

export interface LoadPostDetail {
  postId: string
  writer: string
  profile: string
  postText: string

  pinCount: number
  pinImage: string[]
  latLng: Array<{ lat: number; lng: number }>

  direction: number
  likeUsers: number
  bookMarkUsers: number
  taggedUsers: number

  commentCount: number
  comment?: CommentContent[]
}

export interface CommentContent {
  id: string
  image: string
  commentWriter: string
  comment: string
  tagged_users?: string[]
  time: number
  heartCount: number
  isHeartButtonClick: boolean
}

export interface CommentSendToBackend {
  writer: string
  post: string
  content: string
  tagged_users?: string[]
}
