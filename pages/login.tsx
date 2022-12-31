import { ReactElement, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { gql, useMutation } from "@apollo/client";
import client from "../apollo-client";

import { useForm, zodResolver } from "@mantine/form";
import { NumberInput, TextInput, Button } from "@mantine/core";
import { Tooltip, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import * as Yup from "yup";
import { z } from "zod";
import bell from "../public/bell.svg";
import { DropzoneButton } from "../components/DropZone";
import { nationalities } from "../helpers/countries";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { CreateSellerInput, useCreateSeller } from "../hooks/useCreateSeller";
import NotLoggedLayout from "../components/notLoggedLayout";
import { useLoginUser } from "../hooks/useLogin";
import { Router, useRouter } from "next/router";

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

function Login() {
	const [loginUser] = useLoginUser();
	const router = useRouter();

	async function handleSubmit(values: any) {
		// console.log(values);
		const { data } = await loginUser({
			variables: {
				loginUserInput: {
					email: values.email,
					password: values.password,
				},
			},
		});
		console.log(data.loginUser._id);
		localStorage.setItem("id", data.loginUser._id);
		router.push("/all-sellers");
	}

	const form = useForm({
		initialValues: {
			email: "",
			password: "",
		},

		// functions will be used to validate values at corresponding key
		// validate: zodResolver(schema),
	});

	return (
		<div className="flex justify-center">
			<form
				onSubmit={form.onSubmit((values) => {
					// setObj(values);
					handleSubmit(values);
				})}
				// onSubmit={form.onSubmit(console.log)}
				className="flex flex-col justify-center items-center w-full mt-3"
			>
				{/* <div className="flex justify-center bg-slate-200 w-4/5 rounded-2xl"> */}
				<div className="flex flex-col items-start justify-center w-1/2  pb-[25px] pt-[20px] bg-slate-100 rounded-2xl shadow-2xl">
					<h2 className="ml-4 mb-2 font-medium">Se connecter::</h2>

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
						type={"email"}
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
				</div>

				<div className="flex justify-center w-3/4">
					<Button
						type="submit"
						mt="sm"
						className="bg-green-700 hover:bg-green-600 w-2/3"
					>
						Envoyer
					</Button>
				</div>
			</form>
		</div>
	);
}

Login.getLayout = (page: ReactElement) => {
	return <NotLoggedLayout>{page}</NotLoggedLayout>;
};

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

export default Login;
