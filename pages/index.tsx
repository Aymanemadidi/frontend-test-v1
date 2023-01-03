import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import bell from "../public/bell.svg";

const Home: NextPage = ({ users }: any) => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			{users.map((user: any) => {
				return (
					<div key={user.email} className="flex gap-2 flex-col">
						<div>{user.email}</div>
						<div>{user._id}</div>
						<div>{user.role}</div>
						<Image src={bell} alt="next" width={20} height={20} />
						<hr />
					</div>
				);
			})}
		</div>
	);
};

export async function getStaticProps() {
	const { data } = await client.query({
		query: gql`
			query Users {
				users {
					_id
					email
					role
				}
			}
		`,
	});

	return {
		props: {
			users: data.users,
		},
	};
}

export default Home;
