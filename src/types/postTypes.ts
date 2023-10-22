// 핀
// 이미지, 자동 해시태그와 텍스트, 위도 경도, 장소 id
export interface Pin {
  picture: File
  hashtagAuto: HashtagAutoAndText
  LatLng: { lat: number; lng: number }
  placeId: number
}

// 추가로 작성한 해시태그 리스트와 전체 텍스트
export interface HashtagAndText {
  hashtag: string[]
  text: string
}

// 자동해시태그별 해시태그와 그에 해당하는 텍스트
export interface HashtagAutoAndText {
  hashtagAuto: string
  text: string
}

// 백엔드로 보내지는 게시글 정보
// 게시글 전체 텍스트, 핀들
export interface PostSendToBackend {
  content: string
  pins: Pin[]
  tagged_users?: string[]
}

export interface SendPostCoordinate {
  content: string
  pins: SendPinCoordinate[]
}

// 게시글 수정 시
export interface UpdatePost {
  content: string
  pins: UpdatePin[]
  tagged_users?: string[]
}

// 핀 수정 시
export interface UpdatePin {
  id: number
  image: string
  pin_hashtag: string
  content: string
  latitude: number
  longitude: number
}

export interface SendPinCoordinate {
  image: File
  pin_hashtag: string
  content: string
  latitude: number
  longitude: number
  mapID: string
}

export interface LoadPostPagination {
  count: number
  next?: string
  previous?: string
  results: LoadPost[]
}

// 위까지는 게시글 작성이며 아래는 작성 후

// 게시글 불러오기
// 메인, 상세 모든 곳에서 사용해보자
export interface LoadPost {
  post: {
    id: number
    writer: string
    content: string
    is_liked: boolean
    pin_count: number
    like_count: number
    tagged_users?: string[] | undefined
    like_users: string[]
    is_bookmarked: boolean
    bookmark_users: string[]
    comment_count: number
    created_at: string
  }
  pin: LoadPin[]
  user: {
    image: string
  }
  comment: LoadComment[]
}

// 핀에 대한 인터페이스
export interface LoadPin {
  image: string
  latitude: number
  longitude: number
}

// 댓글 불러오기
export interface LoadComment {
  id: number
  writer_image: string
  writer: string
  content: string
  tagged_users?: string[] | undefined
  created_at: string
  updated_at: string
  post: number
  like_count: number
  like_users: string[]
  is_liked: boolean
}

// 댓글 작성
export interface SendComment {
  writer: string
  post: string
  content: string
  tagged_users?: string[]
}

// 게시글 좋아요
// 게시글 아이디, 좋아요 수, 내 좋아요 상태
export interface LikeType {
  postId: string
  like_count: number
  like_status: boolean
}

// 댓글 좋아요
// 댓글 아이디, 좋아요 수, 내 좋아요 상태
export interface LikeCommentType {
  commentId: string
  like_count: number
  like_status: boolean
}

// 게시글 북마크
// 게시글 아이디, 북마크 상태
export interface BookMarkType {
  postid: string
  bookmark: boolean
}

export interface RecommendUserType {
  recommendUserList: RecommendUserList[]
}

// 메인 페이지 유저 추천
// 프로필, 닉네임, 같이 아는 사람,
export interface RecommendUserList {
  image: string
  nickname: string
  acquaintances: string[]
}

// 게시글 검색 - 메인이랑 동일
export interface SearchPostType {
  post: LoadPost[]
}

// 핀 검색
// 프로필, 작성자, 핀, 게시글 id, 좋아요 누른 수, 좋아요 상태, 북마크
export interface SearchPinType {
  writer_image: string
  writer: string
  image: string
  post_id: number
  like_users: string[]
  is_liked: boolean
  is_bookmarked: boolean
}

// 지도 검색
// 게시글 id -> 클릭하면 해당 게시글로 이동위해, 프로필, 위도 경도
export interface SearchMapType {
  postId: string
  image: string
  latLng: Array<{ lat: number; lng: number }>
}

// 유저 검색
// 프로필, 닉네임, 이름
export interface SearchUserType {
  image: string
  uname: string
  name: string
}
