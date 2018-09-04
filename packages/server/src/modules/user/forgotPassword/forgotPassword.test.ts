import * as faker from 'faker'
import * as Redis from 'ioredis'
import { Connection } from 'typeorm'

import { passwordNotLongEnough } from '@instagram/common'

import { User } from '../../../entity/User'
import { createTestConnection } from '../../../testUtils/createTestConnection'
import { createForgotPasswordLink } from '../../../utils/createForgotPasswordLink'
import { forgotPasswordLockAccount } from '../../../utils/forgotPasswordLockAccount'
import { TestClient } from '../../../utils/TestClient'
import { forgotPasswordLockedError } from '../login/errorMessages'
import { expiredKeyError } from './errorMessages'

let conn: Connection
export const redis = new Redis()
faker.seed(Date.now() + 0)
const firstName = faker.name.firstName()
const lastName = faker.name.lastName()
const email = faker.internet.email()
const password = faker.internet.password()
const username = faker.internet.userName()
const newPassword = faker.internet.password()

let userId: string
beforeAll(async () => {
  conn = await createTestConnection()
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    username,
    registeredAt: new Date(),
    confirmed: true,
    forgotPasswordLocked: true
  }).save()
  userId = user.id
})

afterAll(async () => {
  conn.close()
})

describe('forgot password', () => {
  test('make sure it works', async () => {
    const client = new TestClient(`${process.env.TEST_HOST}/graphql`)

    // lock account
    await forgotPasswordLockAccount(userId, redis)
    const url = await createForgotPasswordLink('', userId, redis)

    const parts = url.split('/')
    const key = parts[parts.length - 1]

    const response6 = await client.login(email, password)
    // make sure you can't login to locked account
    expect(response6).toEqual({
      data: {
        login: [
          {
            ok: '👎',
            message: forgotPasswordLockedError,
            path: 'email'
          }
        ]
      }
    })

    // try changing to a password that's too short
    expect(await client.forgotPasswordChange('a', key)).toEqual({
      data: {
        forgotPasswordChange: [
          {
            path: 'newPassword',
            message: passwordNotLongEnough
          }
        ]
      }
    })

    const response = await client.forgotPasswordChange(newPassword, key)

    expect(response.data).toEqual({
      forgotPasswordChange: null
    })

    // make sure redis key expires after password change
    expect(
      await client.forgotPasswordChange(faker.internet.password(), key)
    ).toEqual({
      data: {
        forgotPasswordChange: [
          {
            path: 'key',
            message: expiredKeyError
          }
        ]
      }
    })
    expect(await client.login(email, newPassword)).toEqual({
      data: {
        login: [
          {
            ok: '👍',
            path: null,
            message: 'Logged in successfully'
          }
        ]
      }
    })
  })
})
