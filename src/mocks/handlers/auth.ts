import { rest } from 'msw'
import { SERVER_BASE_URL } from '../../config'
import { type Auth } from '../../components/callback/kakao'

export const authHandler = [
  // login (추후에 프로필 사진도 로드할 필요있음)
  rest.post(
    `${SERVER_BASE_URL as string}/accounts/google/callback`,
    async (req, res, ctx) => {
      const jwt: Auth = {
        name: '김진호',
        nickname: 'jinokim98',
        email: 'jinokim98@gmail.com',
        age: 26,
        gender: 'M',
        access: 'auth',
      }
      return await res(ctx.json(jwt))
    }
  ),

  // login (추후에 프로필 사진도 로드할 필요있음)
  rest.post(
    `${SERVER_BASE_URL as string}/accounts/kakao/callback`,
    async (req, res, ctx) => {
      const jwt: Auth = {
        name: '김진호',
        nickname: 'jinokim98',
        email: 'jinokim98@gmail.com',
        age: 26,
        gender: 'M',
        access: 'auth',
      }
      return await res(ctx.json(jwt))
    }
  ),
]
