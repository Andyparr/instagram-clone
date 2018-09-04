import * as faker from 'faker'
import { Connection } from 'typeorm'
import { createTestConnection } from '../../../testUtils/createTestConnection'
import {
  duplicateEmail,
  emailNotLongEnough,
  invalidEmail,
  passwordNotLongEnough
} from './errorMessages'
import { TestClient } from '../../../utils/TestClient'
import { User } from '../../../entity/User'

const validFirstName = faker.name.firstName().toString()
const validLastName = faker.name.lastName()
const validEmail = faker.internet.email()
const validPassword = faker.internet.password()
const validUsername = faker.internet.userAgent()

let connection: Connection

beforeAll(async () => {
  connection = await createTestConnection()
})

afterAll(async () => {
  connection.close()
})

describe('Resgister user', async () => {
  test('Register user successfully', async () => {
    const client = new TestClient(`${process.env.TEST_HOST}/graphql`)
    const response = await client.register(
      validFirstName,
      validLastName,
      validEmail,
      validPassword,
      validUsername
    )
    expect(response.data.register[0]).toEqual({
      ok: '👍',
      path: null,
      message: 'User has been registered successfully'
    })
    const users = await User.find({ where: { email: validEmail } })
    expect(users).toHaveLength(1)
    const user = users[0]
    expect(user.email).toEqual(validEmail)
    expect(user.password).not.toEqual(validPassword)
  })

  test('Register user with duplicate email', async () => {
    const client = new TestClient(`${process.env.TEST_HOST}/graphql`)
    const response = await client.register(
      validFirstName,
      validLastName,
      validEmail,
      validPassword,
      validUsername
    )
    expect(response.data.register).toHaveLength(1)
    expect(response.data.register[0]).toEqual({
      ok: '👎',
      path: 'email',
      message: duplicateEmail
    })
  })

  test('Invalid email error', async () => {
    const client = new TestClient(`${process.env.TEST_HOST}/graphql`)
    const response = await client.register(
      validFirstName,
      validLastName,
      'as',
      validPassword,
      validUsername
    )
    expect(response.data).toEqual({
      register: [
        {
          ok: '👎',
          path: 'email',
          message: emailNotLongEnough
        },
        {
          ok: '👎',
          path: 'email',
          message: invalidEmail
        }
      ]
    })
  })

  test('Invalid password error', async () => {
    const client = new TestClient(`${process.env.TEST_HOST}/graphql`)
    const response = await client.register(
      validFirstName,
      validLastName,
      validEmail,
      'te',
      validUsername
    )
    expect(response.data).toEqual({
      register: [
        {
          ok: '👎',
          path: 'password',
          message: passwordNotLongEnough
        }
      ]
    })
  })

  test('Invalid email and password error', async () => {
    const client = new TestClient(`${process.env.TEST_HOST}/graphql`)
    const response = await client.register(
      validFirstName,
      validLastName,
      'te',
      'te',
      validUsername
    )
    expect(response.data).toEqual({
      register: [
        {
          ok: '👎',
          path: 'email',
          message: emailNotLongEnough
        },
        {
          ok: '👎',
          path: 'email',
          message: invalidEmail
        },
        {
          ok: '👎',
          path: 'password',
          message: passwordNotLongEnough
        }
      ]
    })
  })
})
