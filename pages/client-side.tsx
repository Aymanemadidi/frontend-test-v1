import Head from "next/head";
import ClientOnly from "../components/ClientOnly";
import Users from "../components/Users";

export default function ClientSide() {
	return (
		<div className="">
			<main className="">
				<ClientOnly>
					<Users />
				</ClientOnly>
			</main>
		</div>
	);
}
