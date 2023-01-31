import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
	uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
	credentials: "include",
});

const client = new ApolloClient({
	credentials: "include",
	link: httpLink,
	cache: new InMemoryCache(),
});

export default client;
