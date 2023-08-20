import { useRecoilState } from 'recoil'
import post from '../atom/post'
import { useCallback } from 'react'
import {
  type PostSendToBackend,
  type HashtagAndText,
  type Pin,
  type SendPostCoordinate,
} from '../../types/postTypes'
import { coordinatePostSendType } from '../../types/sendPost'
import { type AxiosError } from 'axios'
import { request } from '../../util/axios'
import useUser from './useUser'
import { SERVER_BASE_URL } from '../../config'

interface usePostFunction {
  pins: Pin[]
  imgUrls: string[]
  hashtagAndText: HashtagAndText
  enrollImages: (pins: Pin[], imgUrls: string[]) => void
  changePlace: (pins: Pin[], imgUrls: string[]) => void
  changeHashtagAndText: (pins: Pin[], hashtagAndText: HashtagAndText) => void
  savePost: (diff: PostSendToBackend) => Promise<boolean>
}

function usePost(): usePostFunction {
  const [createPost, setCreatePost] = useRecoilState(post)
  const { loadUserInfo } = useUser()

  const pins = createPost.pins
  const imgUrls = createPost.imgUrls
  const hashtagAndText = createPost.hashtagAndText

  const enrollImages = useCallback((pins: Pin[], imgUrls: string[]) => {
    setCreatePost({
      pins,
      hashtagAndText: { hashtag: [], text: '' },
      imgUrls,
    })
  }, [])

  const changePlace = useCallback((pins: Pin[], imgUrls: string[]) => {
    setCreatePost({
      pins,
      hashtagAndText: { hashtag: [], text: '' },
      imgUrls,
    })
  }, [])

  const changeHashtagAndText = useCallback(
    (pins: Pin[], hashtagAndText: HashtagAndText) => {
      setCreatePost((prev) => {
        return {
          ...prev,
          pins,
          hashtagAndText,
        }
      })
    },
    []
  )

  const savePost = useCallback(async (diff: PostSendToBackend) => {
    const accessToken = loadUserInfo().accessToken

    try {
      const sendData: SendPostCoordinate = coordinatePostSendType(diff)

      const formData = new FormData()
      formData.append('content', sendData.content)

      // 파일을 보낼 때는 폼데이터로 보내야한다.
      sendData.pins.forEach((pin, index) => {
        formData.append(`pins[${index}]image`, pin.image, pin.image.name) // File 객체를 직접 추가
        formData.append(`pins[${index}]pin_hashtag`, pin.pin_hashtag)
        formData.append(`pins[${index}]content`, pin.content)
        formData.append(`pins[${index}]latitude`, pin.latitude.toString())
        formData.append(`pins[${index}]longitude`, pin.longitude.toString())
        formData.append(`pins[${index}]mapID`, pin.mapID)
      })

      console.log(`${SERVER_BASE_URL as string}/api/post/create/`)

      await request('post', `/api/post/create/`, formData, {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      })

      return true
    } catch (error) {
      const err = error as AxiosError
      if (err.response != null) {
        console.log(`status: ${err.response.status}`)
      }
      return false
    }
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
