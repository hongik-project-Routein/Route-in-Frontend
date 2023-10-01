import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import postdetail from './../atom/postdetail'

import { type LoadComment, type LoadPost } from '../../types/postTypes'
import comment from './../selector/comment'

interface usePostDetailFunction {
  postDetail: LoadPost
  postComment: LoadComment[]
  loadPostDetail: (currentPost: LoadPost) => void
  enrollComment: (comment: LoadComment) => void
  deleteComment: (id: number) => void
  updateComment: (id: number, comment: LoadComment) => void
  setLike: (response: string) => void
  setBookmark: (response: string) => void
  setCommentLike: (response: string, id: number) => void
}

function usePostDetail(): usePostDetailFunction {
  const [postDetail, setPostDetail] = useRecoilState(postdetail)
  const [postComment, setPostComment] = useRecoilState(comment)

  // 글 로드
  const loadPostDetail = useCallback((currentPost: LoadPost) => {
    setPostDetail(currentPost)
  }, [])

  // 게시글 좋아요 클릭
  const setLike = useCallback(
    (response: string) => {
      if (response === '좋아요 성공') {
        const upCount = postDetail.post.like_count + 1
        const likeStatus = !postDetail.post.is_liked
        const newPost = {
          ...postDetail,
          post: {
            ...postDetail.post,
            like_count: upCount,
            is_liked: likeStatus,
          },
        }

        setPostDetail(newPost)
      } else {
        const downCount = postDetail.post.like_count - 1
        const likeStatus = !postDetail.post.is_liked
        const newPost = {
          ...postDetail,
          post: {
            ...postDetail.post,
            like_count: downCount,
            is_liked: likeStatus,
          },
        }
        setPostDetail(newPost)
      }
    },
    [postDetail]
  )

  // 댓글 좋아요 클릭
  const setCommentLike = useCallback(
    (response: string, id: number) => {
      const commentIdx = postComment.findIndex((comment) => comment.id === id)

      if (response === '좋아요 성공') {
        const upCount = postComment[commentIdx].like_count + 1
        const likeStatus = !postComment[commentIdx].is_liked
        const newComment = [...postComment]

        newComment[commentIdx] = {
          ...newComment[commentIdx],
          is_liked: likeStatus,
          like_count: upCount,
        }
        setPostComment(newComment)
      } else {
        const downCount = postComment[commentIdx].like_count - 1
        const likeStatus = !postComment[commentIdx].is_liked
        const newComment = [...postComment]

        newComment[commentIdx] = {
          ...newComment[commentIdx],
          is_liked: likeStatus,
          like_count: downCount,
        }
        setPostComment(newComment)
      }
    },
    [postDetail]
  )

  // 북마크 클릭
  const setBookmark = useCallback(
    (response: string) => {
      console.log(response)

      const bookmarkStatus = !postDetail.post.is_bookmarked
      const newPost = {
        ...postDetail,
        post: { ...postDetail.post, is_bookmarked: bookmarkStatus },
      }
      setPostDetail(newPost)
    },
    [postDetail]
  )

  // 댓글 등록
  const enrollComment = useCallback(
    (comment: LoadComment) => {
      const newComment = [...postComment, comment]
      const plusCount = postDetail.post.comment_count + 1

      const newPost = {
        ...postDetail,
        post: { ...postDetail.post, comment_count: plusCount },
        comment: newComment,
      }
      setPostDetail(newPost)
      setPostComment(newComment)
    },
    [postDetail, postComment, setPostDetail]
  )

  // 댓글 삭제
  const deleteComment = useCallback(
    (id: number) => {
      const newComment = postComment.filter((comment) => comment.id !== id)
      const minusCount = postDetail.post.comment_count - 1

      const newPost = {
        ...postDetail,
        post: { ...postDetail.post, comment_count: minusCount },
        comment: newComment,
      }

      setPostDetail(newPost)
      setPostComment(newComment)
    },
    [postDetail, postComment, setPostDetail]
  )

  // 댓글 수정
  const updateComment = useCallback(
    (id: number, comment: LoadComment) => {
      const updateComments = [...postComment]
      updateComments[id] = comment
      setPostComment(updateComments)
    },
    [postDetail, postComment, setPostComment]
  )

  return {
    postDetail,
    postComment,
    loadPostDetail,
    enrollComment,
    deleteComment,
    updateComment,
    setLike,
    setBookmark,
    setCommentLike,
  }
}

export default usePostDetail
