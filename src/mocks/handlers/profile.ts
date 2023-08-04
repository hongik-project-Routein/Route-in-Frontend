import { rest } from 'msw'
import { SERVER_BASE_URL } from '../../config'
import { postDemo } from '../data/post'

export const profileHandler = [
  rest.get(
    `${SERVER_BASE_URL as string}/profile/:username/`,
    async (req, res, ctx) => {
      const { username } = req.params
      console.log(username)

      return await res(ctx.json(postDemo))
    }
  ),

  // 팔로워 삭제
  rest.delete(
    `${SERVER_BASE_URL as string}/api/user/follower/:nickname`,
    async (req, res, ctx) => {
      const { nickname } = req.params
      const response = nickname
      return await res(ctx.json(response))
    }
  ),

  // 팔로잉 삭제
  rest.delete(
    `${SERVER_BASE_URL as string}/api/user/following/:nickname`,
    async (req, res, ctx) => {
      const { nickname } = req.params
      const response = nickname
      return await res(ctx.json(response))
    }
  ),

  // 팔로잉 추가
  rest.post(
    `${SERVER_BASE_URL as string}/api/user/following`,
    async (req, res, ctx) => {
      const { nickname } = await req.json()
      const response = nickname
      return await res(ctx.json(response))
    }
  ),

  // 소개글 변경
  rest.post(
    `${SERVER_BASE_URL as string}/api/user/profile`,
    async (req, res, ctx) => {
      const { introduction } = await req.json()
      const response = introduction
      return await res(ctx.json(response))
    }
  ),

  rest.get(
    `${SERVER_BASE_URL as string}/api/user/profilepost/:nickname`,
    async (req, res, ctx) => {
      const { nickname } = req.params
      const response = postDemo.filter((post) => post.post.writer === nickname)
      return await res(ctx.json(response))
    }
  ),
]
