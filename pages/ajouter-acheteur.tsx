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
// import { DropzoneButton } from "../components/DropZone";
import { nationalities } from "../helpers/countries";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { CreateBuyerInput, useCreateBuyer } from "../hooks/useCreateBuyer";
import { IconChevronDown, IconChevronRight } from "@tabler/icons";
import NotLoggedLayout from "../components/notLoggedLayout";
import { useRouter } from "next/router";

const initialValues: CreateBuyerInput = {
	nomEntreprise: "",
	numeroSiret: "",
	codePostal: "",
	ville: "",
	departement: "",
	pays: "",
	numFixe: "",
	numPortable: "",
	dateOfBirth: "",
	nationality: "",
	website: "",
	firstName: "",
	lastName: "",
	email: "",
	pseudo: "",
	password: "",
	adresse: "",
	companyAdresse: "",
	civilite: "",
	tvaIntra: "",
	typeCompte: "entreprise",
	countryOfResidency: "",
	companyCodePostal: "",
	companyPays: "",
	companyVille: "",
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

	enum SelectedPage {}

	const [fixTel, setFixTel] = useState(0);
	const [obj, setObj] = useState<CreateBuyerInput>(initialValues);
	const [createBuyer] = useCreateBuyer();
	const [pageSelected, setPageSelected] = useState("general");
	const [phoneCountry, setPhoneCountry] = useState("fr");
	const router = useRouter();

	async function handleSubmit(values: CreateBuyerInput) {
		try {
			console.log(values);
			const buyers = await createBuyer({
				variables: {
					createBuyerInput: {
						nomEntreprise: values.nomEntreprise,
						lastName: values.lastName,
						numeroSiret: Number(values.numeroSiret),
						codePostal: values.codePostal,
						ville: values.ville,
						role: "Buyer",
						dateOfBirth: values.dateOfBirth,
						nationality: values.nationality,
						adresse: values.adresse,
						countryOfResidency: values.countryOfResidency,
						departement: values.departement,
						mobileNumber: Number(values.numPortable),
						fixNumber: Number(values.numFixe),
						firstName: values.firstName,
						email: values.email,
						// pseudo: values.nomEntreprise,
						password: values.password,
						website: values.website,
						pays: values.pays,
						companyAdresse: values.companyAdresse,
						civilite: "",
						tvaIntra: "",
						companyCodePostal: values.codePostal,
						companyVille: values.ville,
						companyPays: values.companyPays,
						statut: "new",
						isArchived: false,
					},
				},
			});
			console.log(buyers);
			router.push("/acheteurs");
		} catch (error) {
			alert(error);
		}
	}

	const form = useForm({
		initialValues: {
			nomEntreprise: "",
			numeroSiret: "",
			codePostal: "",
			ville: "",
			departement: "",
			pays: "",
			numFixe: "",
			numPortable: "",
			dateOfBirth: "",
			nationality: "",
			website: "",
			firstName: "",
			lastName: "",
			email: "",
			pseudo: "",
			password: "",
			adresse: "",
			companyAdresse: "",
			numberOfEmployees: "",
			civilite: "",
			tvaIntra: "",
			typeCompte: "",
			countryOfResidency: "",
			companyCodePostal: "",
			companyVille: "",
			companyPays: "",
		},

		// functions will be used to validate values at corresponding key
		// validate: zodResolver(schema),
	});

	return (
		<div className="flex justify-center gap-[60px] ml-[10%]  md:ml-[15%]">
			<div className="hidden lg:block w-[420px] justify-start bg-white shadow-lg rounded-2xl">
				<div className="flex flex-col gap-5 ml-[30px] mt-[30px]">
					<div>
						<p className="text-lg">Menu</p>
					</div>
					<div className="ml-1 flex-col flex gap-[20px] text-[15px]">
						<div
							className={`flex gap-5 cursor-pointer ${
								pageSelected === "general" ? "text-green-500" : ""
							}`}
							onClick={() => setPageSelected("general")}
						>
							{pageSelected === "general" ? (
								<IconChevronDown size={17} className={`mt-1`} />
							) : (
								<IconChevronRight size={17} className={`mt-1`} />
							)}
							<p className={`font-semibold`}>Géneral</p>
						</div>
						{/* <div
							className={`flex gap-5 cursor-pointer ${
								pageSelected === "zones" ? "text-green-500" : ""
							}`}
							onClick={() => setPageSelected("zones")}
						>
							{pageSelected === "zones" ? (
								<IconChevronDown size={17} className={`mt-1`} />
							) : (
								<IconChevronRight size={17} className={`mt-1`} />
							)}
							<p
								className={`font-semibold ${
									pageSelected === "zones" ? "text-green-500" : ""
								}`}
							>
								Zones
							</p>
						</div>
						<div className="flex gap-5 cursor-pointer">
							<IconChevronRight size={17} className="mt-1" />
							<p>Modes de livraison</p>
						</div>
						<div className="flex gap-5 cursor-pointer">
							<IconChevronRight size={17} className="mt-1" />
							<p>Gestion de la facturation</p>
						</div>
						<div className="flex gap-5 cursor-pointer">
							<IconChevronRight size={17} className="mt-1" />
							<p>General</p>
						</div>
						<div className="flex gap-5 cursor-pointer">
							<IconChevronRight size={17} className="mt-1" />
							<p>General</p>
						</div>
						<div className="flex gap-5 cursor-pointer">
							<IconChevronRight size={17} className="mt-1" />
							<p>General</p>
						</div>
						<div className="flex gap-5 cursor-pointer">
							<IconChevronRight size={17} className="mt-1" />
							<p>General</p>
						</div> */}
					</div>
				</div>
			</div>
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
				<div>Ajouter un acheteur</div>
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
						{...form.getInputProps("companyCodePostal")}
					/>
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
						placeholder="Adresse de votre société"
						withAsterisk
						{...form.getInputProps("companyAdresse")}
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
						placeholder="Ville de votre société"
						withAsterisk
						{...form.getInputProps("companyVille")}
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
					<Select
						label="Pays"
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
						placeholder="Pays de votre société"
						{...form.getInputProps("companyPays")}
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
						{...form.getInputProps("countryOfResidency")}
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
						label={"Code postal"}
						radius={25}
						mt="sm"
						placeholder="Code postal"
						withAsterisk
						{...form.getInputProps("codePostal")}
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
