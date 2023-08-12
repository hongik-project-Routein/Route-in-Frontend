import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type LoadComment, type LoadPost } from '../../types/postTypes'

// 상세 페이지 접근 시
interface DetailState {
  post: LoadPost['post']
  pin: LoadPost['pin']
  user: LoadPost['user']
  comment: LoadPost['comment']
}

const initialState: DetailState = {
  post: {
    id: 0,
    writer: '',
    content: '',
    pin_count: 0,
    like_count: 0,
    is_liked: false,
    is_bookmarked: false,
    like_users: [],
    bookmark_users: [],
    comment_count: 0,
  },
  pin: [],
  user: {
    image: '',
  },
  comment: [],
}

interface DetailPayload {
  currentPost: LoadPost
}

interface HeartButtonClickPayload {
  key: number
  comment: LoadComment
}

const postDetailSlice = createSlice({
  name: 'postDetail',
  initialState,
  reducers: {
    // 게시글 불러오기
    LoadPostDetail(state: DetailState, action: PayloadAction<DetailPayload>) {
      state.post = action.payload.currentPost.post
      state.pin = action.payload.currentPost.pin
      state.user = action.payload.currentPost.user
      state.comment = action.payload.currentPost.comment
    },
    // 댓글 등록
    EnrollComment(state: DetailState, action: PayloadAction<LoadComment>) {
      state.comment.push(action.payload)
      state.post.comment_count += 1
    },
    // 댓글 좋아요 클릭
    CommentLikeClick(
      state: DetailState,
      action: PayloadAction<HeartButtonClickPayload>
    ) {
      const updatedComment = state.comment.map((comment) => {
        if (comment.id === action.payload.key) {
          return {
            ...comment,
            like_count: action.payload.comment.like_count,
            like_status: action.payload.comment.is_liked,
          }
        } else {
          return comment
        }
      })
      state.comment = updatedComment
    },
  },
})

const { reducer, actions } = postDetailSlice
export const { LoadPostDetail, EnrollComment, CommentLikeClick } = actions
export default reducer
