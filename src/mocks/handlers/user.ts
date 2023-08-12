import { rest } from 'msw'
import { SERVER_BASE_URL } from '../../config'
import { userDemo } from '../data/user'

export const UserHandler = [
  rest.get(
    `${SERVER_BASE_URL as string}/api/user/:username`,
    async (req, res, ctx) => {
      const { username } = req.params
      const wholeUser = userDemo
      const currentUser = wholeUser.find((user) => user.nickname === username)
      return await res(ctx.json(currentUser))
    }
  ),

  rest.get(
    `${SERVER_BASE_URL as string}/api/user/recommend/:nickname`,
    async (req, res, ctx) => {
      const { nickname } = req.params
      const wholeUser = userDemo

      const response = wholeUser.filter(
        (user) => user.nickname !== nickname && user.nickname !== 'Isabella'
      )

      return await res(ctx.json(response))
    }
  ),

  rest.get(
    `${SERVER_BASE_URL as string}/api/user/uname/:uname`,
    async (req, res, ctx) => {
      const { uname } = req.params
      console.log(uname)
      return await res(ctx.json(true))
    }
  ),
]
