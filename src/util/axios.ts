import axios, { type AxiosRequestConfig } from 'axios'
import { SERVER_BASE_URL } from '../config'
import { getCookie } from './csrfToken'

const domain: string = SERVER_BASE_URL ?? ''
axios.defaults.withCredentials = true
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.headers.common['X-CSRFTOKEN'] = getCookie('csrftoken')

// // access token
// axios.defaults.headers.post.Authorization = `Bearer ${
//   JSON.parse(localStorage.getItem('user') as string).accessToken as string
// }`

export const request = async <T>(
  method: string,
  url: string,
  data?: any,
  headers?: Record<string, string>
): Promise<T> => {
  const config: AxiosRequestConfig = {
    method,
    url: domain + url,
    data,
    headers,
  }

  return await axios(config)
    .then((res) => res.data)
    .catch((error) => {
      throw error
    })
}
