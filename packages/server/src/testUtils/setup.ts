import { startServer } from '../startServer'

export const setup = async () => {
  await startServer()
  process.env.TEST_HOST = `http://127.0.0.1:4000`
}
