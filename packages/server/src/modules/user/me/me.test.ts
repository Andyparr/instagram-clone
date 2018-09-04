import * as faker from 'faker'
import { Connection } from 'typeorm'
import { createTestConnection } from '../../../testUtils/createTestConnection'
import { TestClient } from '../../../utils/TestClient'
import { User } from '../../../entity/User'

let userId: string
let conn: Connection
const firstName = faker.name.firstName()
const lastName = faker.name.lastName()
const email = faker.internet.email()
const password = faker.internet.password()
const username = faker.internet.userName()

beforeAll(async () => {
  conn = await createTestConnection()
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    username,
    registeredAt: new Date(),
    confirmed: true
  }).save()
  userId = user.id
})

afterAll(async () => {
  conn.close()
})

describe('me', () => {
  test('return null if no cookie', async () => {
    const client = new TestClient(`${process.env.TEST_HOST}/graphql`)
    const response = await client.me()
    expect(response.data.me).toBeNull()
  })

  test('get current user', async () => {
    const client = new TestClient(`${process.env.TEST_HOST}/graphql`)
    await client.login(email, password)
    const response = await client.me()

    expect(response.data).toEqual({
      me: {
        id: userId,
        email
      }
    })
  })
})
