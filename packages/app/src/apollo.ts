import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { Platform } from 'react-native'
import { createUploadLink } from 'apollo-upload-client'

const host = Platform.OS === 'ios' ? 'http://localhost' : '10.0.2.2'

export const client = new ApolloClient({
  link: createUploadLink({
    uri: `${host}:4000`
  }),
  cache: new InMemoryCache()
})
