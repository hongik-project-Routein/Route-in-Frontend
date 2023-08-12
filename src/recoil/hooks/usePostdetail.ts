import { useRecoilState } from 'recoil'
import postdetail from './../atom/postdetail'
import { useCallback } from 'react'
import { type LoadComment, type LoadPost } from '../../types/postTypes'
import comment from './../selector/comment'

function usePostDetail(): any {
  const [postDetail, setPostDetail] = useRecoilState(postdetail)
  const [postComment, setPostComment] = useRecoilState(comment)

  // 글 로드
  const loadPostDetail = useCallback((currentPost: LoadPost) => {
    setPostDetail(currentPost)
  }, [])

  // 좋아요 클릭
  const setLike = useCallback((response: string) => {
    if (response === '좋아요 성공') {
      const upCount = postDetail.post.like_count + 1
      const likeStatus = !postDetail.post.is_liked
      const newPost = {
        ...postDetail,
        post: { ...postDetail.post, like_count: upCount, is_liked: likeStatus },
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
  }, [])

  // 북마크 클릭
  const setBookmark = useCallback(() => {
    const bookmarkStatus = !postDetail.post.is_bookmarked
    const newPost = {
      ...postDetail,
      post: { ...postDetail.post, is_bookmarked: bookmarkStatus },
    }
    setPostDetail(newPost)
  }, [])

  // 댓글 등록
  const enrollComment = useCallback(
    (comment: LoadComment) => {
      const newComment = [...postComment, comment]
      const plusCount = postDetail.post.comment_count + 1

      setPostComment(newComment)
      const newPost = {
        ...postDetail,
        post: { ...postDetail.post, comment_count: plusCount },
      }
      setPostDetail(newPost)
    },
    [postDetail, setPostDetail]
  )

  // 댓글 삭제
  const deleteComment = useCallback(
    (id: number) => {
      const newComment = postComment.filter((comment) => comment.id !== id)
      const plusCount = postDetail.post.comment_count - 1

      setPostComment(newComment)
      const newPost = {
        ...postDetail,
        post: { ...postDetail.post, comment_count: plusCount },
      }
      setPostDetail(newPost)
    },
    [postDetail, setPostDetail]
  )

  // 댓글 수정
  const updateComment = useCallback(
    (id: number, comment: LoadComment) => {
      const updateComments = [...postComment]
      updateComments[id] = comment
      setPostComment(updateComments)
    },
    [postComment, setPostComment]
  )

  return {
    postDetail,
    loadPostDetail,
    enrollComment,
    deleteComment,
    updateComment,
    setLike,
    setBookmark,
  }
}

export default usePostDetail
