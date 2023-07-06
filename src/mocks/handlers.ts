import { rest } from 'msw'

export const handlers = [
  rest.get(
    '/fruits',
    async (req, res, ctx) =>
      await res(ctx.status(200), ctx.json(['사과', '바나나']))
  ),
]
