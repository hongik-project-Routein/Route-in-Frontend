import { authHandler } from './handlers/auth'
import { PostHandler } from './handlers/post'
import { profileHandler } from './handlers/profile'
import { searchHandler } from './handlers/search'
import { CommentHandler } from './handlers/comment'
import { UserHandler } from './handlers/user'

export const handlers = [
  ...authHandler,
  ...PostHandler,
  ...profileHandler,
  ...searchHandler,
  ...CommentHandler,
  ...UserHandler,
]
