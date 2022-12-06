import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from "@apollo/client";

export const AWS_URL =
  "https://ks3wus2tpbcfbkeofdpgrzsn6a.appsync-api.us-west-2.amazonaws.com/graphql";

export const X_API_KEY = "da2-sl25pqw62ng4xpv3rn2xwgshri";

const link = createHttpLink({ uri: AWS_URL });

export const CLIENT = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
