import { createAsyncThunk } from '@reduxjs/toolkit'
import { coordinatePostSendType } from '../types/sendPost'
import {
  type SendPostCoordinate,
  type PostSendToBackend,
} from '../../types/postTypes'
import axios, { type AxiosError } from 'axios'
import { SERVER_BASE_URL } from '../../config'
import useUser from '../../recoil/hooks/useUser'

export const SavePost = createAsyncThunk(
  'savepost',
  async (diff: PostSendToBackend) => {
    console.log('here')

    const { loadUserInfo } = useUser()
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

      await axios.post(
        `${SERVER_BASE_URL as string}/api/post/create/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
    } catch (error) {
      const err = error as AxiosError
      if (err.response != null) {
        console.log(`status: ${err.response.status}`)
      }
      console.log(error)
    }
  }
)
