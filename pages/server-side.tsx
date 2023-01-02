import { useState } from "react";
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

interface Seller {
	nomEntreprise: string;
	numeroSiret: number;
	groupe: string;
	codeNAF: string;
	codePostal: string;
	ville: string;
	departement: string;
	pays: string;
	IBAN: string;
	numFixe: number;
	numPortable: number;
	website: string;
	prenom: string;
	nom: string;
	email: string;
	pseudo: string;
	password: string;
	// adresse: "",
}

const d = new Date();

const initialValues: CreateSellerInput = {
	nomEntreprise: "",
	numeroSiret: "",
	groupe: "",
	codeNAF: "",
	codePostal: "",
	ville: "",
	departement: "",
	pays: "",
	IBAN: "",
	numFixe: "",
	numPortable: "",
	dateOfBirth: "",
	nationality: "",
	website: "",
	prenom: "",
	nom: "",
	email: "",
	pseudo: "",
	password: "",
	adress: "",
	countryOfResidence: "",
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
	const [obj, setObj] = useState<CreateSellerInput>(initialValues);
	const [createSeller] = useCreateSeller();

	async function handleSubmit(values: CreateSellerInput) {
		console.log(values);
		const tokens = await createSeller({
			variables: {
				createSellerInput: {
					nomEntreprise: values.nomEntreprise,
					lastName: values.nom,
					numeroSiret: Number(values.numeroSiret),
					groupe: values.groupe,
					codeNAF: values.codeNAF,
					codePostal: values.codePostal,
					ville: values.ville,
					role: "Seller",
					IBAN: values.IBAN,
					dateOfBirth: values.dateOfBirth,
					nationality: values.nationality,
					adresse: values.adress,
					countryOfResidency: values.countryOfResidence,
					departement: values.departement,
					mobileNumber: Number(values.numPortable),
					fixNumber: Number(values.numFixe),
					firstName: values.prenom,
					email: values.email,
					// pseudo: values.nomEntreprise,
					password: values.password,
					website: values.website,
					pays: values.pays,
					statut_moderation: false,
					statut: "new",
				},
			},
		});
		console.log(tokens);
	}

	const form = useForm({
		initialValues: {
			nomEntreprise: "",
			numeroSiret: "",
			groupe: "",
			codeNAF: "",
			codePostal: "",
			ville: "",
			departement: "",
			pays: "",
			IBAN: "",
			numFixe: "",
			numPortable: "",
			dateOfBirth: "",
			nationality: "",
			website: "",
			prenom: "",
			nom: "",
			email: "",
			pseudo: "",
			password: "",
			adress: "",
			countryOfResidence: "",
		},

		// functions will be used to validate values at corresponding key
		// validate: zodResolver(schema),
	});

	return (
		<div className="flex justify-center ml-[10%]  md:ml-[15%]">
			<form
				onSubmit={form.onSubmit((values) => {
					// setObj(values);
					handleSubmit(values);
				})}
				// onSubmit={form.onSubmit(console.log)}
				className="flex flex-col justify-center ml-[15%] w-full mt-3"
			>
				<div>Inscription Vendeur</div>
				{/* <div className="flex justify-center bg-slate-200 w-4/5 rounded-2xl"> */}
				<div className="flex flex-col items-start justify-start pb-[25px] pt-[20px] bg-slate-100 w-4/5 rounded-2xl shadow-2xl">
					<h2 className="ml-4 mb-2 font-medium">Informations entreprise:</h2>
					<TextInput
						classNames={{
							root: "pl-3 pr-3 w-full",
							wrapper: "w-full",
							input:
								"w-full font-semibold placeholder:font-normal font-semibold placeholder:text-gray-400 border-slate-200 mt-[3px]",
							label: "ml-2 flex",
						}}
						label={
							<div className="flex gap-1">
								<p className="">Nom de l'entreprise</p>
								<Tooltip className="" label="Help">
									<Image
										className="bg-none"
										alt="burger"
										src={bell}
										height={13}
									/>
								</Tooltip>
							</div>
						}
						radius={25}
						placeholder="Nom de l'entreprise"
						withAsterisk
						{...form.getInputProps("nomEntreprise")}
					/>
					<TextInput
						classNames={{
							root: "pl-3 pr-3 w-full",
							wrapper: "w-full",
							input:
								"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
							label: "ml-2 flex",
						}}
						label={
							<div className="flex gap-1">
								<p className="">Numero Siret</p>
								<Tooltip className="" label="Help">
									<Image
										className="bg-none"
										alt="burger"
										src={bell}
										height={13}
									/>
								</Tooltip>
							</div>
						}
						radius={25}
						mt="sm"
						placeholder="Numéro SIRET"
						withAsterisk
						// value={null}
						{...form.getInputProps("numeroSiret")}
					/>
					<TextInput
						classNames={{
							root: "pl-3 pr-3 w-full",
							wrapper: "w-full",
							input:
								"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
							label: "ml-2",
						}}
						label={"Groupe"}
						radius={25}
						mt="sm"
						placeholder="Groupe"
						withAsterisk
						{...form.getInputProps("groupe")}
					/>
					<TextInput
						classNames={{
							root: "pl-3 pr-3 w-full",
							wrapper: "w-full",
							input:
								"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
							label: "ml-2",
						}}
						label={"Code NAF"}
						radius={25}
						mt="sm"
						placeholder="Code NAF"
						withAsterisk
						{...form.getInputProps("codeNAF")}
					/>

					<TextInput
						classNames={{
							root: "pl-3 pr-3 w-full",
							wrapper: "w-full",
							input:
								"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
							label: "ml-2",
						}}
						label={"Code postal"}
						radius={25}
						mt="sm"
						placeholder="Code postal"
						withAsterisk
						{...form.getInputProps("codePostal")}
					/>
					<TextInput
						classNames={{
							root: "pl-3 pr-3 w-full",
							wrapper: "w-full",
							input:
								"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
							label: "ml-2",
						}}
						label={"Ville"}
						radius={25}
						mt="sm"
						placeholder="Ville"
						withAsterisk
						{...form.getInputProps("ville")}
					/>
					<TextInput
						classNames={{
							root: "pl-3 pr-3 w-full",
							wrapper: "w-full",
							input:
								"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
							label: "ml-2",
						}}
						label={"Departement"}
						radius={25}
						mt="sm"
						placeholder="Departement"
						withAsterisk
						{...form.getInputProps("departement")}
					/>
					<TextInput
						classNames={{
							root: "pl-3 pr-3 w-full",
							wrapper: "w-full",
							input:
								"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
							label: "ml-2",
						}}
						label={"Pays"}
						radius={25}
						mt="sm"
						placeholder="Pays"
						withAsterisk
						{...form.getInputProps("pays")}
					/>
					<TextInput
						classNames={{
							root: "pl-3 pr-3 w-full",
							wrapper: "w-full",
							input:
								"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
							label: "ml-2",
						}}
						label={"IBAN"}
						radius={25}
						mt="sm"
						placeholder="IBAN"
						withAsterisk
						{...form.getInputProps("IBAN")}
					/>
					<TextInput
						classNames={{
							root: "pl-3 pr-3 w-full",
							wrapper: "w-full",
							input:
								"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
							label: "ml-2",
						}}
						label={"Site Web"}
						radius={25}
						mt="sm"
						placeholder="Site Web"
						withAsterisk
						{...form.getInputProps("website")}
					/>
					<TextInput
						classNames={{
							root: "pl-3 pr-3 w-full",
							wrapper: "w-full",
							input:
								"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
							label: "ml-2",
						}}
						label={"Pseudo"}
						radius={25}
						mt="sm"
						placeholder="Pseudo"
						withAsterisk
					/>
					{/* {Photo upload area} */}
					{/* <TextInput
						classNames={{
							root: "pl-3 pr-3 w-full",
							wrapper: "w-full",
							input:
								"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
							label: "ml-2",
						}}
						label={"Logo"}
						radius={25}
						mt="sm"
						placeholder="Logo URL"
						withAsterisk
					/>
					<div className="flex">
						<DropzoneButton />
					</div> */}
				</div>
				<div className="flex flex-col items-start justify-start mt-5 pb-[25px] pt-[20px] bg-slate-100 w-4/5 rounded-2xl shadow-2xl">
					<h2 className="ml-4 mb-2">Informations de contact</h2>
					{/* <Select
						label="Civilité"
						classNames={{
							input: "rounded-2xl",
							label: "ml-1",
						}}
						className="ml-4 mt-1 flex flex-col gap-1 justify-start items-start rounded-2xl"
						placeholder="Civilité"
						data={[
							{ value: "mm", label: "Mme" },
							{ value: "m", label: "M" },
						]}
						withAsterisk
					/> */}
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
						{...form.getInputProps("prenom")}
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
						{...form.getInputProps("nom")}
					/>
					<DatePicker
						placeholder="Date de naissance"
						classNames={{
							input:
								"rounded-2xl font-normal placeholder:font-thin placeholder:text-gray-600 border-slate-200 mt-1",
							label: "ml-1",
						}}
						className="ml-3 mt-3 flex flex-col gap-1 justify-start items-start"
						label="Date de naissance"
						withAsterisk
						{...form.getInputProps("dateOfBirth")}
					/>
					<Select
						label="Nationalité"
						placeholder="Nationalité"
						searchable
						nothingFound="No options"
						classNames={{
							input:
								"rounded-2xl font-normal placeholder:font-thin placeholder:text-gray-600 border-slate-200 mt-1",
							label: "ml-1",
						}}
						className="ml-3 mt-3 flex flex-col gap-1 justify-start items-start"
						maxDropdownHeight={280}
						data={data}
						{...form.getInputProps("nationality")}
					/>
					<Select
						label="Pays de residence"
						placeholder="Pays de residence"
						searchable
						nothingFound="No options"
						classNames={{
							input:
								"rounded-2xl font-normal placeholder:font-thin placeholder:text-gray-600 border-slate-200 mt-1",
							label: "ml-1",
						}}
						className="ml-3 mt-3 flex flex-col gap-1 justify-start items-start"
						maxDropdownHeight={280}
						withAsterisk
						data={data2}
						{...form.getInputProps("countryOfResidence")}
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
							Numéro de téléphone fixe
						</p>
						<PhoneInput
							country={"fr"}
							containerClass="mt-3"
							inputClass="h-[20px] rounded-2xl"
							inputStyle={{ borderRadius: "30px" }}
							specialLabel=""
							{...form.getInputProps("numFixe")}
							// value={this.state.phone}
							// onChange={(phone) => this.setState({ phone })}
						/>
					</div>
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
					<TextInput
						classNames={{
							root: "pl-3 pr-3 w-full",
							wrapper: "w-full",
							input:
								"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
							label: "ml-2",
						}}
						label={"Adresse"}
						radius={25}
						mt="sm"
						placeholder="Adresse"
						withAsterisk
						{...form.getInputProps("adresse")}
					/>
					<TextInput
						classNames={{
							root: "pl-3 pr-3 w-full",
							wrapper: "w-full",
							input:
								"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
							label: "ml-2",
						}}
						label={"Ville"}
						radius={25}
						mt="sm"
						placeholder="Ville"
						withAsterisk
					/>
					<TextInput
						classNames={{
							root: "pl-3 pr-3 w-full",
							wrapper: "w-full",
							input:
								"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
							label: "ml-2",
						}}
						label={"Code postal"}
						radius={25}
						mt="sm"
						placeholder="Code postal"
						withAsterisk
						{...form.getInputProps("pseudo")}
					/>
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
