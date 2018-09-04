import * as bcrypt from 'bcryptjs'
import {
  confirmEmailError,
  invalidLogin,
  forgotPasswordLockedError
} from './errorMessages'
import { ResolverMap } from '../../../types/graphql-utils'
import { User } from '../../../entity/User'
import { userSessionIdPrefix } from '../../../constants'
import { GQL } from '../../../types/graphql-schema'
import { getConnection } from 'typeorm'

const errorResponse = [
  {
    ok: '👎',
    message: invalidLogin
  }
]

export const resolvers: ResolverMap = {
  Mutation: {
    login: async (
      _,
      args: GQL.MutationToLoginArgs,
      { session, redis, req }
    ) => {
      const {
        input: { emailOrUsername, password }
      } = args

      const user = await getConnection()
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.email = :email', {
          email: emailOrUsername
        })
        .orWhere('user.username = :username', {
          username: emailOrUsername
        })
        .getOne()

      if (!user) {
        return errorResponse
      }

      if (!user.confirmed) {
        return [
          {
            ok: '👎',
            message: confirmEmailError
          }
        ]
      }

      if (user.forgotPasswordLocked) {
        return [
          {
            ok: '👎',
            message: forgotPasswordLockedError,
            path: 'email'
          }
        ]
      }

      const validLogin = await bcrypt.compare(password, user.password)

      if (!validLogin) {
        return errorResponse
      }

      session.userId = user.id
      if (req.sessionID) {
        await redis.lpush(`${userSessionIdPrefix}${user.id}`, req.sessionID)
      }

      return [
        {
          ok: '👍',
          message: 'Logged in successfully'
        }
      ]
    }
  }
}
