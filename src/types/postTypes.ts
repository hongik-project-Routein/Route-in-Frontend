export interface Post {
  picture: File
  hashtagAuto: HashtagAutoAndText
  tag: JSX.Element
}

interface HashtagAutoAndText {
  hashtagAuto: string
  text: string
}
