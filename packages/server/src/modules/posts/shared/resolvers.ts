import { ResolverMap } from '../../../types/graphql-utils'
import { Post } from '../../../entity/Post'

export const resolvers: ResolverMap = {
  Query: {
    getAllPosts: async () => {
      const posts = await Post.find()
      return posts
    }
  }
}
