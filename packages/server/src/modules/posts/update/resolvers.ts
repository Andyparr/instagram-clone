import { ResolverMap } from '../../../types/graphql-utils'
import { Post } from '../../../entity/Post'
import { GQL } from '../../../types/graphql-schema'

export const resolvers: ResolverMap = {
  Mutation: {
    updatePost: async (_, args: GQL.MutationToUpdatePostArgs) => {
      const {
        input: { id, imageUrl }
      } = args

      const retrievePost = await Post.findOne({ where: { id } })

      if (!retrievePost) {
        return {
          ok: '👎',
          message: 'Post does not exist'
        }
      }
      if (!imageUrl) {
        return {
          ok: '👎',
          message: 'No fields updated'
        }
      }
      if (imageUrl) {
        retrievePost.imageUrl = imageUrl
      }

      await Post.update({ id }, { imageUrl: retrievePost.imageUrl })

      return {
        ok: '👍',
        message: 'Post updated'
      }
    }
  }
}
