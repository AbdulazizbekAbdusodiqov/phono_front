import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
  Observable,
  ApolloLink,
  split,
} from "@apollo/client"
import { WebSocketLink } from "@apollo/client/link/ws"
import { createUploadLink } from "apollo-upload-client"
import { getMainDefinition } from "@apollo/client/utilities"
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev"
import { setUser } from "@/store/chatUser/chatUserSlice"
import { store } from "@/store/store"
import { onError } from "@apollo/client/link/error"

loadErrorMessages()
loadDevMessages()

async function refreshToken(client: ApolloClient<NormalizedCacheObject>) {
  try {
    // const { data } = await client.mutate({
    //   mutation: gql`
    //     mutation RefreshToken {
    //       refreshToken
    //     }
    //   `,
    // })
    // const newAccessToken = data?.refreshToken
    const newAccessToken = getAccessToken()
    console.log("Apollo client log", getAccessToken())
    if (!newAccessToken) {
      throw new Error("New access token not received.")
    }
    return `Bearer ${newAccessToken}`
  } catch (err) {
    throw new Error("Error getting new access token.")
  }
}
let retryCount = 0
const maxRetry = 3

function getAccessToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken")
  }
  return null
}

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3001/graphql`,
  options: {
    reconnect: true,
    connectionParams: () => ({
      Authorization: `Bearer ${getAccessToken()}`,
    }),
  },
})
const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  for (const err of graphQLErrors!) {
    if (err.extensions?.code === "UNAUTHENTICATED" && retryCount < maxRetry) {
      retryCount++
      return new Observable((observer) => {
        refreshToken(client)
          .then((token) => {
            operation.setContext((previousContext: any) => ({
              headers: {
                ...previousContext.headers,
                authorization: token,
              },
            }))
            const forward$ = forward(operation)
            forward$.subscribe(observer)
          })
          .catch((error) => observer.error(error))
      })
    }

    if (err.message === "Refresh token not found") {
      console.log("refresh token not found!")
      store.dispatch(
        setUser(
          { 
            id: undefined,
            profile_img: null,
            first_name: ''
          }
        )
      )
    }
  }
})

const uploadLink = createUploadLink({
  uri: "http://localhost:3001/graphql",
  credentials: "include",
  headers: {
    "apollo-require-preflight": "true",
    "authorization": `Bearer ${getAccessToken()}`,
  },
})
const link = split(
  // Split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  ApolloLink.from([errorLink, uploadLink])
)
export const client = new ApolloClient({
  cache: new InMemoryCache({}),
  credentials: "include",
  link: link,
})
