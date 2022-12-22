import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<Layout>
				<Component {...pageProps} />;
			</Layout>
		</ApolloProvider>
	);
}

export default MyApp;
