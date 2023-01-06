import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// const httpLink = createHttpLink({
// 	uri: "http://localhost:3000/graphql",
// 	credentials: "include",
// });

const httpLink = createHttpLink({
	uri: "https://dev-spare-place-v1-0.onrender.com/graphql",
	credentials: "include",
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	// const token = localStorage.getItem("token");
	// const access_token =
	return {
		headers: {
			...headers,
		},
	};
});

const client = new ApolloClient({
	credentials: "include",
	link: httpLink,
	cache: new InMemoryCache(),
});

// const client = new ApolloClient({
// 	uri: "http://localhost:3000/graphql",
// 	cache: new InMemoryCache(),
// });

export default client;
