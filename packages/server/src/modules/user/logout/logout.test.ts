import * as faker from 'faker'
import { Connection } from 'typeorm'
import { createTestConnection } from '../../../testUtils/createTestConnection'
import { TestClient } from '../../../utils/TestClient'
import { User } from '../../../entity/User'

let connection: Connection
const firstName = faker.name.firstName()
const lastName = faker.name.lastName()
const email = faker.internet.email()
const password = faker.internet.password()
const username = faker.internet.userName()

let userId: string
beforeAll(async () => {
  connection = await createTestConnection()
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
  connection.close()
})

describe('logout', () => {
  test('test logging out a user', async () => {
    const client = new TestClient(`${process.env.TEST_HOST}/graphql`)

    await client.login(email, password)

    const response = await client.me()

    expect(response.data).toEqual({
      me: {
        id: userId,
        email
      }
    })

    await client.logout()

    const response2 = await client.me()

    expect(response2.data.me).toBeNull()
  })

  test('logout of all sessions', async () => {
    const session1 = new TestClient(`${process.env.TEST_HOST}/graphql`)
    const session2 = new TestClient(`${process.env.TEST_HOST}/graphql`)

    await session1.login(email, password)
    await session2.login(email, password)
    expect(await session1.me()).toEqual(await session2.me())
    await session1.logout()
    expect(await session1.me()).toEqual(await session2.me())
  })
})
