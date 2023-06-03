import axios, { type AxiosRequestConfig } from 'axios'
import { SERVER_BASE_URL } from '../config'

const domain: string = SERVER_BASE_URL ?? ''
axios.defaults.withCredentials = true

export const request = async <T>(
  method: string,
  url: string,
  data?: any
): Promise<T> => {
  const config: AxiosRequestConfig = {
    method,
    url: domain + url,
    data,
  }
  console.log(config)

  return await axios(config)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error)
    })
}
