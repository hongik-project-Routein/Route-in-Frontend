import { type LoadPost } from './postTypes'

export interface UserData {
  uname: string
  id: number
  last_login: string
  email: string
  name: string
  introduction: string
  age: number
  image: string
  following_set: string[]
  follower_set: string[]
  post_set: LoadPost[]
}
