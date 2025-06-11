import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  Observable,
  HttpLink,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { setUser } from "@/store/chatUser/chatUserSlice";
import { store } from "@/store/store";
import { getLocalStorage } from "./utils/local-storege";
import { createUploadLink } from "apollo-upload-client";

loadErrorMessages();
loadDevMessages();

const authLink = new ApolloLink((operation, forward) => {
  const token = getLocalStorage("accessToken");
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));
  return forward(operation);
});

// Token refresh logic (mocked – customize if needed)
async function refreshToken(): Promise<string> {
  const newAccessToken = getLocalStorage("accessToken");
  if (!newAccessToken) throw new Error("No access token found.");
  return `Bearer ${newAccessToken}`;
}

let retryCount = 0;
const maxRetry = 3;

// Error handler for token expiration
const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === "UNAUTHENTICATED" && retryCount < maxRetry) {
        retryCount++;
        return new Observable((observer) => {
          refreshToken()
            .then((token) => {
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                  authorization: token,
                },
              }));
              forward(operation).subscribe(observer);
            })
            .catch((error) => observer.error(error));
        });
      }

      if (err.message === "Refresh token not found") {
        console.warn("Refresh token missing – logging user out");
        store.dispatch(
          setUser({
            id: undefined,
            profile_img: null,
            first_name: "",
          })
        );
      }
    }
  }
});

// HTTP Link for regular queries/mutations (file uploads included)
const httpLink = new HttpLink({
  uri: "http://localhost:3001/graphql",
  credentials: "include",
});

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, // e.g. '/api/graphql'
  credentials: 'include',
});

// WebSocket link for subscriptions
const wsLink = typeof window !== "undefined"
  ? new WebSocketLink({
      uri: `ws://localhost:3001/graphql`,
      options: {
        reconnect: true,
        connectionParams: () => ({
          Authorization: `Bearer ${getLocalStorage("accessToken")}`,
        }),
      },
    })
  : null;

// Split based on operation type (subscriptions vs. everything else)
const splitLink = typeof window !== "undefined" && wsLink
  ? split(
      ({ query }) => {
        const def = getMainDefinition(query);
        return def.kind === "OperationDefinition" && def.operation === "subscription";
      },
      wsLink,
      ApolloLink.from([authLink, errorLink, httpLink, uploadLink])  // Using httpLink here
    )
  : ApolloLink.from([authLink, errorLink, httpLink, uploadLink]);

// Final Apollo Client instance
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
  credentials: "include",
});
