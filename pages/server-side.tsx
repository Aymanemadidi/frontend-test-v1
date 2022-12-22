import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { gql } from "@apollo/client";
import client from "../apollo-client";

import { useForm } from "@mantine/form";
import { NumberInput, TextInput, Button } from "@mantine/core";
import { Tooltip } from "@mantine/core";
import bell from "../public/bell.svg";

function Demo() {
	const form = useForm({
		initialValues: { name: "", email: "", age: 0 },

		// functions will be used to validate values at corresponding key
		validate: {
			name: (value) =>
				value.length < 2 ? "Name must have at least 2 letters" : null,
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
			age: (value) =>
				value < 18 ? "You must be at least 18 to register" : null,
		},
	});

	return (
		<div className="flex justify-start  ml-[25%] bg-[#f7f9fd] border border-red-600">
			<form
				onSubmit={form.onSubmit(console.log)}
				className="flex flex-col items-start justify-start w-full"
			>
				<TextInput
					classNames={{
						root: "pl-3 w-full",
						wrapper: "w-4/5",
						input:
							"w-full placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-[3px]",
						label: "ml-2 flex",
					}}
					label={
						<div className="flex">
							<p>Nom:</p>
							<Tooltip label="Help">
								<Image
									className="bg-none"
									alt="burger"
									src={bell}
									height={13}
								/>
							</Tooltip>
						</div>
					}
					onInput={() => console.log("youpi")}
					radius={25}
					placeholder="Nom de l'entreprise"
					withAsterisk
					{...form.getInputProps("name")}
				/>
				<TextInput
					classNames={{
						root: "pl-3 w-full",
						wrapper: "w-4/5",
						input:
							"w-full placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
						label: "ml-2",
					}}
					label={"Numéro SIRET"}
					radius={25}
					mt="sm"
					placeholder="Numéro SIRET"
					withAsterisk
					{...form.getInputProps("email")}
				/>
				<TextInput
					classNames={{
						root: "pl-3 w-full",
						wrapper: "w-4/5",
						input:
							"w-full placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
						label: "ml-2",
					}}
					label={"Email"}
					radius={25}
					mt="sm"
					placeholder="Email"
					withAsterisk
					{...form.getInputProps("email")}
				/>
				<TextInput
					classNames={{
						root: "pl-3 w-full",
						wrapper: "w-4/5",
						input:
							"w-full placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
						label: "ml-2",
					}}
					label={"Groupe"}
					radius={25}
					mt="sm"
					placeholder="Groupe"
					withAsterisk
					{...form.getInputProps("email")}
				/>
				<TextInput
					classNames={{
						root: "pl-3 w-full",
						wrapper: "w-4/5",
						input:
							"w-full placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
						label: "ml-2",
					}}
					label={"Code NAF"}
					radius={25}
					mt="sm"
					placeholder="Code NAF"
					withAsterisk
					{...form.getInputProps("email")}
				/>

				<TextInput
					classNames={{
						root: "pl-3 w-full",
						wrapper: "w-4/5",
						input:
							"w-full placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
						label: "ml-2",
					}}
					label={"Code postal"}
					radius={25}
					mt="sm"
					placeholder="Code postal"
					withAsterisk
					{...form.getInputProps("email")}
				/>
				<TextInput
					classNames={{
						root: "pl-3 w-full",
						wrapper: "w-4/5",
						input:
							"w-full placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
						label: "ml-2",
					}}
					label={"Ville"}
					radius={25}
					mt="sm"
					placeholder="Ville"
					withAsterisk
					{...form.getInputProps("email")}
				/>
				<TextInput
					classNames={{
						root: "pl-3 w-full",
						wrapper: "w-4/5",
						input:
							"w-full placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
						label: "ml-2",
					}}
					label={"Departement"}
					radius={25}
					mt="sm"
					placeholder="Departement"
					withAsterisk
					{...form.getInputProps("email")}
				/>
				<TextInput
					classNames={{
						root: "pl-3 w-full",
						wrapper: "w-4/5",
						input:
							"w-full placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
						label: "ml-2",
					}}
					label={"Pays"}
					radius={25}
					mt="sm"
					placeholder="Pays"
					withAsterisk
					{...form.getInputProps("email")}
				/>
				<TextInput
					classNames={{
						root: "pl-3 w-full",
						wrapper: "w-4/5",
						input:
							"w-full placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
						label: "ml-2",
					}}
					label={"IBAN"}
					radius={25}
					mt="sm"
					placeholder="IBAN"
					withAsterisk
					{...form.getInputProps("email")}
				/>
				<TextInput
					classNames={{
						root: "pl-3 w-full",
						wrapper: "w-4/5",
						input:
							"w-full placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
						label: "ml-2",
					}}
					label={"Site Web"}
					radius={25}
					mt="sm"
					placeholder="Site Web"
					withAsterisk
					{...form.getInputProps("email")}
				/>

				<Button type="submit" mt="sm" className="bg-red-500">
					Submit
				</Button>
			</form>
		</div>
	);
}

// export default Basic;

// const Home: NextPage = ({ users }: any) => {
// 	return (
// 		<div className="flex min-h-screen flex-col items-center justify-center py-2"></div>
// 	);
// };

// export async function getServerSideProps() {
// 	// console.log(client);
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

export default Demo;
