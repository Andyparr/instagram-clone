import middleware from './middleware'
import { createMiddleware } from '../../../utils/createMiddleware'
import { ResolverMap } from '../../../types/graphql-utils'
import { User } from '../../../entity/User'

export const resolvers: ResolverMap = {
  Query: {
    me: createMiddleware(middleware, (_, __, { session }) =>
      User.findOne({ where: { id: session.userId } })
    )
  }
}
