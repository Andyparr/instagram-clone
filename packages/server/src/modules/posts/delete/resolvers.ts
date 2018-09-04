import { ResolverMap } from '../../../types/graphql-utils'
import { Post } from '../../../entity/Post'
import { GQL } from '../../../types/graphql-schema'

export const resolvers: ResolverMap = {
  Mutation: {
    deletePost: async (_, args: GQL.MutationToDeletePostArgs) => {
      const { id } = args
      const retrievePost = await Post.findOne({ where: { id } })
      if (!retrievePost) {
        return {
          ok: '👎',
          message: 'Post does not exist'
        }
      }
      await retrievePost.remove()
      return {
        ok: '👍',
        message: 'Post has been removed'
      }
    }
  }
}
