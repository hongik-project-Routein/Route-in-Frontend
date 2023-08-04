import { rest } from 'msw'
import { SERVER_BASE_URL } from '../../config'
import { postDemo } from '../data/post'

export interface LikeCommentResponse {
  postid: number
  commentid: number
  like_count: number
  like_status: boolean
}

export const CommentHandler = [
  // 댓글 등록
  rest.post(
    `${SERVER_BASE_URL as string}/api/comment`,
    async (req, res, ctx) => {
      const newComment = await req.json()
      const post = postDemo.find((post) => post.post.id === newComment.post)
      newComment.id = (post?.comment.length as number) + 1
      post?.comment.push(newComment)
      return await res(ctx.json(post?.comment))
    }
  ),

  // 댓글 좋아요
  rest.post(
    `${SERVER_BASE_URL as string}/api/comment/like`,
    async (req, res, ctx) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { postid, commentid, like_count, like_status } = await req.json()
      const response: LikeCommentResponse = {
        postid,
        commentid,
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        like_count: like_status === true ? like_count - 1 : like_count + 1,
        like_status,
      }
      return await res(ctx.json(response))
    }
  ),
]
