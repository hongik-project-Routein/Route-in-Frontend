import axios, { type AxiosRequestConfig } from 'axios'
import { BASE_URL } from '../config'

const domain: string = BASE_URL ?? ''
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
  return await axios(config)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error)
    })
}
