import * as Redis from 'ioredis'
import fetch from 'node-fetch'
import { Connection } from 'typeorm'
import * as faker from 'faker'

import { createConfirmEmailLink } from './createConfirmEmailLink'
import { User } from '../../../entity/User'
import { createTestConnection } from '../../../testUtils/createTestConnection'

let userId = ''
const redis = new Redis()
faker.seed(Date.now() + 4)
const firstName = faker.name.firstName()
const lastName = faker.name.lastName()
const email = faker.internet.email()
const password = faker.internet.password()
const username = faker.internet.userName()

let conn: Connection

beforeAll(async () => {
  conn = await createTestConnection()
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    username,
    registeredAt: new Date(),
    confirmed: false
  }).save()
  userId = user.id
})

afterAll(async () => {
  conn.close()
})

test('Make sure it confirms user and clears key in redis', async () => {
  const url = await createConfirmEmailLink(
    process.env.TEST_HOST as string,
    userId,
    redis
  )

  const response = await fetch(url)
  const text = await response.text()
  expect(text).toEqual('ok')
  const user = await User.findOne({ where: { id: userId } })
  expect((user as User).confirmed).toBeTruthy()
  const chunks = url.split('/')
  const key = chunks[chunks.length - 1]
  const value = await redis.get(key)
  expect(value).toBeNull()
})
