import "../styles/globals.css";
// import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Layout from "../components/Layout";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../theme";
import createEmotionCache from "../createEmotionCache";

import NotLoggedLayout from "../components/notLoggedLayout";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

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

const App = ({
	Component,
	pageProps,
	emotionCache = clientSideEmotionCache,
}: any) => {
	// use the getLayout defined in each page
	// if it doesn't exist, provide a fallback
	const getLayout = Component.getLayout;

	if (getLayout) {
		return getLayout(
			<CacheProvider value={emotionCache}>
				<ApolloProvider client={client}>
					<MantineProvider>
						<ModalsProvider>
							<NotificationsProvider>
								<ThemeProvider theme={theme}>
									<Component {...pageProps} />
								</ThemeProvider>
							</NotificationsProvider>
						</ModalsProvider>
					</MantineProvider>
				</ApolloProvider>
			</CacheProvider>
		);
	} else {
		return (
			<ApolloProvider client={client}>
				<MantineProvider>
					<ModalsProvider>
						<NotificationsProvider>
							<Layout>
								<ThemeProvider theme={theme}>
									<Component {...pageProps} />;
								</ThemeProvider>
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
