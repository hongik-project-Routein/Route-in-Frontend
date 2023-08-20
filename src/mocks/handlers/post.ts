import { rest } from 'msw'
import { SERVER_BASE_URL } from '../../config'
import { postDemo } from '../data/post'
import { updatedPost } from '../data/updatePost'

export interface LikeResponse {
  postid: number
  like_count: number
  like_status: boolean
}

export const PostHandler = [
  // load post
  rest.get(`${SERVER_BASE_URL as string}/api/post`, async (req, res, ctx) => {
    return await res(ctx.json(postDemo))
  }),

  rest.post(
    `${SERVER_BASE_URL as string}/api/post/create/`,
    async (req, res, ctx) => {
      console.log(req)
      return await res(ctx.json(true))
    }
  ),

  // load post detail
  rest.get(
    `${SERVER_BASE_URL as string}/api/post/:postid`,
    async (req, res, ctx) => {
      const { postid } = req.params
      const post = postDemo.find((post) => post.post.id === Number(postid))

      return await res(ctx.json(post))
    }
  ),

  // 게시글 좋아요
  rest.post(
    `${SERVER_BASE_URL as string}/api/post/:postid/like/`,
    async (req, res, ctx) => {
      const response = '좋아요 성공'
      return await res(ctx.json(response))
    }
  ),

  // 게시글 북마크
  rest.post(
    `${SERVER_BASE_URL as string}/api/post/bookmark`,
    async (req, res, ctx) => {
      const response = '북마크 성공'
      return await res(ctx.json(response))
    }
  ),

  // save post
  rest.post(
    `${SERVER_BASE_URL as string}/api/post/create/`,
    async (req, res, ctx) => {
      return await res(ctx.status(201), ctx.json(['success']))
    }
  ),

  // 게시글 수정 정보 요청
  rest.get(
    `${SERVER_BASE_URL as string}/api/post/:postid/update`,
    async (req, res, ctx) => {
      const { postid } = req.params
      console.log(postid)
      const response = updatedPost
      return await res(ctx.json(response))
    }
  ),

  // 게시글 수정
  rest.post(
    `${SERVER_BASE_URL as string}/api/post/:postid/update`,
    async (req, res, ctx) => {
      const { postid } = req.params
      console.log(postid)
      const response = 'ok'
      return await res(ctx.json(response))
    }
  ),
]
