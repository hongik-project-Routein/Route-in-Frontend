import axios, { type AxiosRequestConfig } from 'axios'
import { SERVER_BASE_URL } from '../config'
import { getCookie } from './csrfToken'

const domain: string = SERVER_BASE_URL ?? ''
axios.defaults.withCredentials = true
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'

export const request = async <T>(
  method: string,
  url: string,
  data?: any
): Promise<T> => {
  const CSRF_TOKEN = getCookie('csrftoken')
  const config: AxiosRequestConfig = {
    method,
    url: domain + url,
    data,
    headers: {
      'X-CSRFTOKEN': CSRF_TOKEN,
    },
  }

  return await axios(config)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error)
    })
}
