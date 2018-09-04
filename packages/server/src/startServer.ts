import 'reflect-metadata'
import 'dotenv/config'

import { ApolloServer } from 'apollo-server-express'
import * as connectRedis from 'connect-redis'
import * as express from 'express'
import * as RateLimit from 'express-rate-limit'
import * as session from 'express-session'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import * as RateLimitRedisStore from 'rate-limit-redis'

import { redisSessionPrefix } from './constants'
import { userLoader } from './loaders/UserLoader'
import { redis } from './redis'
import { createTestConnection } from './testUtils/createTestConnection'
import { createTypeormConnection } from './utils/createTypeormConnection'
import { genSchema } from './utils/genSchema'
import { confirmEmail } from './routes/confirmEmail'

const SESSION_SECRET = 'ajslkjalksjdfkl'
const RedisStore = connectRedis(session as any)

export const startServer = async () => {
  if (process.env.NODE_ENV === 'test') {
    await redis.flushall()
  }

  const schema = genSchema() as any

  const pubsub = new RedisPubSub()

  const server = new ApolloServer({
    schema,
    context: async ({ req, res }: any) => {
      return {
        redis,
        url: req ? req.protocol + '://' + req.get('host') : '',
        session: req ? req.session : undefined,
        req: req,
        res: res,
        userLoader: userLoader(),
        pubsub
      }
    }
  })

  const app = express()

  app.use(
    new RateLimit({
      store: new RateLimitRedisStore({
        client: redis
      }),
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      delayMs: 0 // disable delaying - full speed until the max limit is reached
    })
  )

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: redisSessionPrefix
      }) as any,
      name: 'qid',
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    })
  )

  app.use('/images', express.static('images'))

  const cors = {
    credentials: true,
    origin:
      process.env.NODE_ENV === 'test'
        ? '*'
        : (process.env.FRONTEND_HOST as string)
  }

  app.get('/confirm/:id', confirmEmail)

  if (process.env.NODE_ENV === 'test') {
    await createTestConnection(true)
  } else {
    await createTypeormConnection()
  }

  const port = process.env.NODE_ENV === 'test' ? 4000 : 4000

  server.applyMiddleware({ app })

  await app.listen({ cors, port }, () =>
    console.log(
      `🚀  Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  )

  server.stop()
  return app
}
