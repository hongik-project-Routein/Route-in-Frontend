import { rest } from 'msw'
import { SERVER_BASE_URL } from '../../config'

export const CommentHandler = [
  // 댓글 등록
  rest.post(
    `${SERVER_BASE_URL as string}/api/post/:postid/comment`,
    async (req, res, ctx) => {
      const response = {
        id: 3,
        writer_image: 'hello',
        writer: 'jinokim98',
        content: '안녕하세요',
        tagged_users: [],
        updated_at: '1',
        post: 1,
        like_count: 0,
        is_liked: false,
      }
      return await res(ctx.json(response))
    }
  ),

  // 댓글 수정
  rest.put(
    `${SERVER_BASE_URL as string}/api/comment/:id`,
    async (req, res, ctx) => {
      const { comment } = await req.json()
      return await res(ctx.json(comment))
    }
  ),

  // 댓글 좋아요
  rest.post(
    `${SERVER_BASE_URL as string}/api/comment/:commentid/like/`,
    async (req, res, ctx) => {
      const response = '좋아요 성공'
      return await res(ctx.json(response))
    }
  ),

  rest.delete(
    `${SERVER_BASE_URL as string}/api/comment/:commentid/delete/`,
    async (req, res, ctx) => {
      const response = true
      return await res(ctx.json(response))
    }
  ),
]
