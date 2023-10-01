import { rest } from 'msw'
import { SERVER_BASE_URL } from '../../config'
import { userDemo } from '../data/user'

export const UserHandler = [
  rest.get(
    `${SERVER_BASE_URL as string}/api/user/:username`,
    async (req, res, ctx) => {
      const { username } = req.params
      const wholeUser = userDemo
      const currentUser = wholeUser.find((user) => user.uname === username)
      return await res(ctx.json(currentUser))
    }
  ),

  rest.get(
    `${SERVER_BASE_URL as string}/api/recommend/user/`,
    async (req, res, ctx) => {
      const response = { results: userDemo }
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

  rest.get(
    `${SERVER_BASE_URL as string}/api/user/mention/`,
    async (req, res, ctx) => {
      console.log(req)

      const response = userDemo
      console.log(response)

      return await res(ctx.json(response))
    }
  ),
]
