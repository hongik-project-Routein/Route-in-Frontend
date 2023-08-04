import { rest } from 'msw'
import { SERVER_BASE_URL } from '../../config'

export const searchHandler = [
  rest.get(
    `${SERVER_BASE_URL as string}/search/:category/:keyword`,
    async (req, res, ctx) => {
      const { category, keyword } = req.params

      return await res(
        ctx.json(
          `category: ${category as string}, keyword: ${keyword as string}`
        )
      )
    }
  ),
]
