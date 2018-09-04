import { User } from '../../../entity/User'
import { GQL } from '../../../types/graphql-schema'
import { ResolverMap } from '../../../types/graphql-utils'

export const resolvers: ResolverMap = {
  Mutation: {
    deleteUser: async (_: any, args: GQL.MutationToDeleteUserArgs) => {
      const { id } = args
      const retrieveUser = await User.findOne({ where: { id } })
      if (!retrieveUser) {
        return {
          ok: '👎',
          message: 'User does not exist'
        }
      }
      await retrieveUser.remove()
      return {
        ok: '👍',
        message: 'User has been removed'
      }
    }
  }
}
