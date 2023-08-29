import { rest } from 'msw'
import { SERVER_BASE_URL } from '../../config'
import { Category } from '../../recoil/atom/search'
import { type LoadPostPagination } from '../../types/postTypes'
import { postDemo } from '../data/post'
import { pinDemo } from '../data/pin'
import { userDemo } from '../data/user'

export const searchHandler = [
  rest.get(
    `${SERVER_BASE_URL as string}/search/:keyword/:category`,
    async (req, res, ctx) => {
      const { category, keyword } = req.params
      // const searchParams = new URLSearchParams(req.url.search)
      // const page = searchParams.get('page')
      console.log(keyword)

      if (category === Category.POST || category === Category.MAP) {
        const response: LoadPostPagination = {
          count: postDemo.length,
          results: postDemo,
        }
        return await res(ctx.json(response))
        // 핀 검색
      } else if (category === Category.PIN) {
        const response = {
          count: pinDemo.length,
          results: pinDemo,
        }
        return await res(ctx.json(response))
      } else if (category === Category.USER) {
        const userData = userDemo.map((user) => {
          return {
            image: user.image,
            uname: user.uname,
            name: user.name,
          }
        })
        const response = {
          count: userData.length,
          results: userData,
        }
        return await res(ctx.json(response))
      }
    }
  ),
]
