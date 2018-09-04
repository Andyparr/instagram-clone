import { ResolverMap } from '../../../types/graphql-utils'
import { Post } from '../../../entity/Post'
import { GQL } from '../../../types/graphql-schema'
import { processUpload } from '../../shared/processUpload'

export const resolvers: ResolverMap = {
  Mutation: {
    addPost: async (_, args: GQL.MutationToAddPostArgs, { session }) => {
      const {
        input: { image, ...data }
      } = args

      const imageUrl = await processUpload(image)

      const post = Post.create({
        ...data,
        imageUrl,
        uploadedAt: new Date(),
        userId: session.userId
      })
      await post.save()
      return {
        ok: '👍',
        message: 'Post added'
      }
    }
  }
}
