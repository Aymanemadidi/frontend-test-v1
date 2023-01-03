import "../styles/globals.css";
// import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Layout from "../components/Layout";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";

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

const App = ({ Component, pageProps, accessToken }: any) => {
	// use the getLayout defined in each page
	// if it doesn't exist, provide a fallback
	const getLayout = Component.getLayout;

	if (getLayout) {
		return getLayout(
			<ApolloProvider client={client}>
				<MantineProvider>
					<ModalsProvider>
						<NotificationsProvider>
							<Component {...pageProps} accessToken={accessToken} />
						</NotificationsProvider>
					</ModalsProvider>
				</MantineProvider>
			</ApolloProvider>
		);
	} else {
		return (
			<ApolloProvider client={client}>
				<MantineProvider>
					<ModalsProvider>
						<NotificationsProvider>
							<Layout accessToken={accessToken}>
								<Component {...pageProps} />;
							</Layout>
						</NotificationsProvider>
					</ModalsProvider>
				</MantineProvider>
			</ApolloProvider>
		);
	}
};

export default App;

export async function getServerSideProps(context: any) {
	const { req } = context;
	console.log("req.headers.cookie: ", req.headers.cookie);
	const accessToken = req.headers.cookie.split("access_token=")[1];
	return { props: { accessToken } };
}
