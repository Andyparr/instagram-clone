import * as faker from 'faker'
import { confirmEmailError, invalidLogin } from './errorMessages'
import { Connection } from 'typeorm'
import { createTestConnection } from '../../../testUtils/createTestConnection'
import { TestClient } from '../../../utils/TestClient'
import { User } from '../../../entity/User'

const validFirstName = faker.name.firstName()
const validLastName = faker.name.lastName()
const validEmail = faker.internet.email()
const validPassword = faker.internet.password()
const validUsername = faker.internet.userName()

let connection: Connection

beforeAll(async () => {
  connection = await createTestConnection()
})

afterAll(async () => {
  connection.close()
})

const loginExpectError = async (
  client: TestClient,
  email: string,
  password: string,
  errorMessage: string
) => {
  const response = await client.login(email, password)

  expect(response.data).toEqual({
    login: [
      {
        ok: '👎',
        path: null,
        message: errorMessage
      }
    ]
  })
}

describe('login', () => {
  test('email not found error', async () => {
    const client = new TestClient(`${process.env.TEST_HOST}/graphql`)
    await loginExpectError(
      client,
      'test@test.com',
      'testpassword',
      invalidLogin
    )
  })

  test('email not confirmed', async () => {
    const client = new TestClient(`${process.env.TEST_HOST}/graphql`)

    await client.register(
      validFirstName,
      validLastName,
      validEmail,
      validPassword,
      validUsername
    )

    await loginExpectError(client, validEmail, validPassword, confirmEmailError)
  })

  test('login successfully', async () => {
    const client = new TestClient(`${process.env.TEST_HOST}/graphql`)

    await User.update({ email: validEmail }, { confirmed: true })

    const response = await client.login(validEmail, validPassword)

    expect(response.data).toEqual({
      login: [
        {
          ok: '👍',
          path: null,
          message: 'Logged in successfully'
        }
      ]
    })
  })

  test('invalid password', async () => {
    const client = new TestClient(`${process.env.TEST_HOST}/graphql`)
    await loginExpectError(client, validEmail, 'aslkdfjaksdljf', invalidLogin)
  })
})
