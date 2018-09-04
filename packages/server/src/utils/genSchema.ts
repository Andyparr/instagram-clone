import * as fs from 'fs'
import * as glob from 'glob'
import * as path from 'path'
import { makeExecutableSchema } from 'graphql-tools'
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas'

export const genSchema = () => {
  const pathToModules = path.join(__dirname, '../modules')
  const graphqlTypes = glob
    .sync(`${pathToModules}/**/*.graphql`)
    .map((x) => fs.readFileSync(x, { encoding: 'utf8' }))

  const resolvers = glob
    .sync(`${pathToModules}/**/resolvers.ts`)
    .map((resolver) => require(resolver).resolvers)

  return makeExecutableSchema({
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(resolvers)
  })
}
