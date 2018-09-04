import * as yup from 'yup'
import {
  duplicateEmail,
  emailNotLongEnough,
  invalidEmail,
  passwordNotLongEnough
} from './errorMessages'
import { formatYupError } from '../../../utils/formatYupError'
import { ResolverMap } from '../../../types/graphql-utils'
import { User } from '../../../entity/User'
import { GQL } from '../../../types/graphql-schema'
import { sendEmail } from '../../../utils/sendEmail'
import { createConfirmEmailLink } from '../../../modules/user/register/createConfirmEmailLink'

const schema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail),
  password: yup
    .string()
    .min(3, passwordNotLongEnough)
    .max(255)
})

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (_, args: GQL.MutationToRegisterArgs, { redis, url }) => {
      const {
        input: { firstName, lastName, email, password, username }
      } = args
      try {
        await schema.validate(args.input, { abortEarly: false })
      } catch (error) {
        return formatYupError(error)
      }
      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ['id']
      })

      if (userAlreadyExists) {
        return [
          {
            ok: '👎',
            path: 'email',
            message: duplicateEmail
          }
        ]
      }

      const user = User.create({
        firstName,
        lastName,
        email,
        password,
        username,
        registeredAt: new Date(),
        confirmed: false
      })

      await user.save()

      if (process.env.NODE_ENV !== 'test') {
        await sendEmail(
          email,
          await createConfirmEmailLink(url, user.id, redis),
          'confirm email'
        )
      }

      return [
        {
          ok: '👍',
          message: 'User has been registered successfully'
        }
      ]
    }
  }
}
