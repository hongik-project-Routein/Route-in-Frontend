import { rest } from 'msw'
import { SERVER_BASE_URL } from '../../config'
import { type Auth } from '../../components/auth/kakao'

export const authHandler = [
  // login (추후에 프로필 사진도 로드할 필요있음)
  rest.post(
    `${SERVER_BASE_URL as string}/accounts/google/callback`,
    async (req, res, ctx) => {
      const jwt: Auth = {
        name: '김진호',
        uname: 'jinokim98',
        image: 'https://avatars.githubusercontent.com/u/81083461?v=4',
        email: 'jinokim98@gmail.com',
        age: 26,
        gender: 'M',
        follower_set: ['jane', 'soomineom'],
        following_set: ['Isabella'],
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
        uname: 'jinokim98',
        image: 'https://avatars.githubusercontent.com/u/81083461?v=4',
        email: 'jinokim98@gmail.com',
        age: 26,
        gender: 'M',
        follower_set: ['jane', 'soomineom'],
        following_set: ['Isabella'],
        access: 'auth',
      }
      return await res(ctx.json(jwt))
    }
  ),
]
