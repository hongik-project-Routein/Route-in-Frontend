export interface Post {
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
  posts: Post[]
  text: string
}
