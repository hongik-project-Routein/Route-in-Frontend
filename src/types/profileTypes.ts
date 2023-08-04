import { type LoadPost } from './postTypes'

// 프로필 상단
// 프로필이미지, 닉네임, 게시글 수, 팔로워, 팔로우 리스트, 소개 글
export interface ProfileType {
  profile: string
  nickname: string
  postCount: number
  follower: string[]
  follow: string[]
  introduce: string
}

// 프로필 내 게시글 지도
// 게시글 id, 위도경도
export interface ProfileMapType {
  postId: string
  latLng: Array<{ lat: number; lng: number }>
}

// 프로필 내 게시글
// 메인이랑 동일
export interface ProfilePostType {
  post: LoadPost[]
}

// 팔로우 팔로워
// 프로필, 닉네임, 이름
export interface FollowType {
  profile: string
  nickname: string
  name: string
}
