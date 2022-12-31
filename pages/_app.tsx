import "../styles/globals.css";
// import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Layout from "../components/Layout";
import NotLoggedLayout from "../components/notLoggedLayout";

// function MyApp({ Component, pageProps }: AppProps) {
// 	return (
// 		<ApolloProvider client={client}>
// 			{/* <Layout> */}
// 			<Component {...pageProps} />;{/* </Layout> */}
// 		</ApolloProvider>
// 	);
// }

// export default MyApp;

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

type NextPageWithLayout = NextPage & {
	// define the getLayout method for every page
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	// override the default Component definition
	Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
	// use the getLayout defined in each page
	// if it doesn't exist, provide a fallback
	const getLayout = Component.getLayout;

	if (getLayout) {
		return getLayout(
			<ApolloProvider client={client}>
				<Component {...pageProps} />
			</ApolloProvider>
		);
	} else {
		return (
			<ApolloProvider client={client}>
				<Layout>
					<Component {...pageProps} />;
				</Layout>
			</ApolloProvider>
		);
	}
};

export default App;
