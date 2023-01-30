import { ReactElement, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { gql, useMutation } from "@apollo/client";
import client from "../../../apollo-client";

import { useForm, zodResolver } from "@mantine/form";
import { NumberInput, TextInput, Button } from "@mantine/core";
import { Tooltip, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import * as Yup from "yup";
import { z } from "zod";
import bell from "../public/bell.svg";
// import { DropzoneButton } from "../components/DropZone";
import { nationalities } from "../../../helpers/countries";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { CreateUserInput, useCreateUser } from "../../../hooks/useCreateAdmin";
import { IconChevronDown, IconChevronRight } from "@tabler/icons";
import NotLoggedLayout from "../../../components/notLoggedLayout";
import { useRouter } from "next/router";

const initialValues: any = {
	numPortable: "",
	firstName: "",
	lastName: "",
	email: "",
	password: "",
};

const schema = z.object({
	// nomEntreprise: z
	// 	.string()
	// 	.min(2, { message: "Name should have at least 2 letters" }),
	// numerotSiret: z
	// 	.string()
	// 	.min(2, { message: "Name should have at least 2 letters" }),
	// groupe: z.string().min(2, { message: "Name should have at least 2 letters" }),
	// codeNAF: z
	// 	.string()
	// 	.min(2, { message: "Name should have at least 2 letters" }),
	// codePostal: z
	// 	.string()
	// 	.min(2, { message: "Name should have at least 2 letters" }),
	// ville: z.string().min(2, { message: "Name should have at least 2 letters" }),
	// email: z.string().email({ message: "Invalid email" }),
});

function Demo() {
	const data = nationalities.map(
		(item) => `${item.label?.charAt(0).toUpperCase()}${item.label?.slice(1)}`
	);
	const data2 = nationalities.map(
		(item) => `${item.value?.charAt(0).toUpperCase()}${item.value?.slice(1)}`
	);

	const [fixTel, setFixTel] = useState(0);
	const [obj, setObj] = useState<CreateUserInput>(initialValues);
	const [createUser] = useCreateUser();
	const [pageSelected, setPageSelected] = useState("general");
	const [phoneCountry, setPhoneCountry] = useState("fr");
	const router = useRouter();

	async function handleSubmit(values: CreateUserInput) {
		console.log(values);
		try {
			const user = await createUser({
				variables: {
					createUserInput: {
						lastName: values.lastName,
						role: "Admin",
						mobileNumber: values.numPortable,
						firstName: values.firstName,
						email: values.email,
						password: values.password,
						statut: "actif",
						isArchived: false,
					},
				},
			});
			console.log(user);
			router.push("/utilisateurs/administrateurs");
		} catch (error) {
			alert(error);
		}
	}

	const form = useForm({
		initialValues: {
			numPortable: "",
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},

		// functions will be used to validate values at corresponding key
		// validate: zodResolver(schema),
	});

	return (
		<div className="flex justify-center gap-[60px] ml-[10%]  md:ml-[15%]">
			<form
				onSubmit={form.onSubmit((values) => {
					// setObj(values);
					handleSubmit(values);
				})}
				// onSubmit={form.onSubmit(console.log)}
				// className="flex flex-col justify-center ml-[15%] w-full mt-3"
				className={`${
					pageSelected === "general" ? "flex" : "hidden"
				} flex-col justify-center w-full mt-3`}
			>
				<div>Ajouter un administrateur</div>
				<div className="flex flex-col items-start justify-start mt-5 pb-[25px] pt-[20px] bg-slate-100 w-4/5 rounded-2xl shadow-2xl">
					<h2 className="ml-4 mb-2">Informations de contact</h2>
					<TextInput
						classNames={{
							root: "pl-3 pr-3 w-full",
							wrapper: "w-full",
							input:
								"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
							label: "ml-2",
						}}
						label={"Prénom"}
						radius={25}
						mt="sm"
						placeholder="Prénom"
						withAsterisk
						{...form.getInputProps("firstName")}
					/>
					<TextInput
						classNames={{
							root: "pl-3 pr-3 w-full",
							wrapper: "w-full",
							input:
								"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
							label: "ml-2",
						}}
						label={"Nom"}
						radius={25}
						mt="sm"
						placeholder="Nom"
						withAsterisk
						{...form.getInputProps("lastName")}
					/>
					<TextInput
						classNames={{
							root: "pl-3 pr-3 w-full",
							wrapper: "w-full",
							input:
								"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
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
							root: "pl-3 pr-3 w-full",
							wrapper: "w-full",
							input:
								"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
							label: "ml-2",
						}}
						label={"Mot de passe"}
						radius={25}
						mt="sm"
						placeholder="Mot de passe"
						withAsterisk
						type={"password"}
						{...form.getInputProps("password")}
					/>
					<div className="flex flex-col ml-3 mt-3">
						<p className="text-base font-Montserrat font-normal">
							Numéro de téléphone portable
						</p>
						<PhoneInput
							country={"fr"}
							containerClass="mt-3"
							inputClass="h-[20px] rounded-2xl"
							inputStyle={{ borderRadius: "30px" }}
							specialLabel=""
							{...form.getInputProps("numPortable")}
							// value={this.state.phone}
							// onChange={(phone) => this.setState({ phone })}
						/>
					</div>
				</div>

				<div className="flex justify-center w-3/4">
					<Button
						type="submit"
						mt="sm"
						className="bg-green-700 hover:bg-green-600 w-5/6"
					>
						Envoyer
					</Button>
				</div>
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
