import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
	uri: "http://localhost:3000/graphql",
	credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	// const token = localStorage.getItem("token");
	const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5bWFuZWJ1eWVyMjBAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiQXltYW5lIiwibGFzdE5hbWUiOiJFbG1hZGlkaSIsInJvbGUiOiJCdXllciIsInN1YiI6IjYzYTAzZWQ2OWNhYTNjNTU4OTYwYWVkZCIsImlhdCI6MTY3MTQ1MjQwMywiZXhwIjoxNjcxNDUzMzAzfQ.rpTv0nmZM_pZs8yN2aYKC1HBCTk932uNfr-MUxbXSu4";
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

// const client = new ApolloClient({
// 	link: authLink.concat(httpLink),
// 	cache: new InMemoryCache(),
// });

const client = new ApolloClient({
	uri: "http://localhost:3000/graphql",
	cache: new InMemoryCache(),
});

export default client;
