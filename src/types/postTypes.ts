export interface Pin {
  picture: File
  hashtagAuto: HashtagAutoAndText
  tag: JSX.Element
  LatLng: { lat: number; lng: number }
}

interface HashtagAutoAndText {
  hashtagAuto: string
  text: string
}

export interface PostSendToBackend {
  writer: string
  text: string
  posts: Pin[]
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
