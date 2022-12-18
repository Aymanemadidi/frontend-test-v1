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
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5bUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJub3BlIiwibGFzdE5hbWUiOiJoZWxsbyIsInJvbGUiOiJBZG1pbiIsInN1YiI6IjYzOWYwYjJmNjVkYWRiNmYxMWZlMTYwOCIsImlhdCI6MTY3MTM2NzQ3MSwiZXhwIjoxNjcxMzY4MzcxfQ.g18PZyVLRxR-G7DhjealPnnMRyLgt3LM65o3PkG5Rd5";
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

// const client = new ApolloClient({
// 	uri: "http://localhost:3000/graphql",
// 	cache: new InMemoryCache(),
// });

export default client;
