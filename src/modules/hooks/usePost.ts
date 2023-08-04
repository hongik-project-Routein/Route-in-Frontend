import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeHashtagAndText, ChangePlace, EnrollImages } from '../slice/post'
import {
  type PostSendToBackend,
  type HashtagAndText,
  type Pin,
} from '../../types/postTypes'
import { type AppThunkDispatch } from '../store'
import { SavePost } from '../async/savePost'
import { type RootState } from '..'

function usePost(): any {
  const dispatch = useDispatch()
  const thunkDispatch = useDispatch<AppThunkDispatch>()

  const pins = useSelector((state: RootState) => state.post.pins)
  const imgUrls = useSelector((state: RootState) => state.post.imgUrls)
  const hashtagAndText = useSelector(
    (state: RootState) => state.post.hashtagAndText
  )

  const enrollImages = useCallback((pins: Pin[], imgUrls: string[]) => {
    dispatch(EnrollImages({ pins, imgUrls }))
  }, [])

  const changePlace = useCallback((pins: Pin[], imgUrls: string[]) => {
    dispatch(ChangePlace({ pins, imgUrls }))
  }, [])

  const changeHashtagAndText = useCallback(
    (pins: Pin[], hashtagAndText: HashtagAndText) => {
      dispatch(ChangeHashtagAndText({ pins, hashtagAndText }))
    },
    []
  )
  const savePost = useCallback((diff: PostSendToBackend) => {
    thunkDispatch(SavePost(diff)).catch((err) => {
      console.log(err)
    })
  }, [])

  return {
    pins,
    imgUrls,
    hashtagAndText,
    enrollImages,
    changePlace,
    changeHashtagAndText,
    savePost,
  }
}

export default usePost
