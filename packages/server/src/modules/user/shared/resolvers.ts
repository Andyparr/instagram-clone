import { ResolverMap } from '../../../types/graphql-utils'
import { User } from '../../../entity/User'

export const resolvers: ResolverMap = {
  Query: {
    getAllUsers: async () => {
      const users = await User.find()
      return users
    }
  }
}
