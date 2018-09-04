import { generateTypeScriptTypes } from 'graphql-schema-typescript'
import { genSchema } from '../utils/genSchema'

generateTypeScriptTypes(genSchema(), './src/types/graphql-schema/index.d.ts', {
  namespace: 'GQL',
  typePrefix: 'I'
})
  .then(() => {
    console.log('DONE')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
