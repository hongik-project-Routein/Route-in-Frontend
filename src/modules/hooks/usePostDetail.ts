import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type LoadPost } from '../../types/postTypes'
import { LoadPostDetail } from '../slice/postDetail'
import { type RootState } from '..'

function usePostDetail(): any {
  const dispatch = useDispatch()

  const currentPost = useSelector((state: RootState) => state.postDetail)

  const loadCurrentPost = useCallback((post: LoadPost) => {
    dispatch(LoadPostDetail({ currentPost: post }))
  }, [])

  return {
    currentPost,
    loadCurrentPost,
  }
}

export default usePostDetail
