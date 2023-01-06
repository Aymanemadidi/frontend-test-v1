import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import bell from "../public/bell.svg";

const Home: NextPage = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			home
		</div>
	);
};

// export async function getStaticProps() {
// 	const { data } = await client.query({
// 		query: gql`
// 			query Users {
// 				users {
// 					_id
// 					email
// 					role
// 				}
// 			}
// 		`,
// 	});

// 	return {
// 		props: {
// 			users: data.users,
// 		},
// 	};
// }

export default Home;
