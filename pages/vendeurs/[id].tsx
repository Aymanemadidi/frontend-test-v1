import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { gql, useMutation, useQuery } from "@apollo/client";
import client from "../../apollo-client";

import { useForm, zodResolver } from "@mantine/form";
import { NumberInput, TextInput, Button } from "@mantine/core";
import { Tooltip, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import * as Yup from "yup";
import { z } from "zod";
import bell from "../../public/bell.svg";
// import { DropzoneButton } from "../../components/DropZone";
import { nationalities } from "../../helpers/countries";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import {
	CreateSellerInput,
	useCreateSeller,
} from "../../hooks/useCreateSeller";
import {
	UpdateSellerInput,
	useUpdateSeller,
} from "../../hooks/useUpdateSeller";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
import { openConfirmModal } from "@mantine/modals";

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
	typeCompte: "entreprise",
	countryOfResidence: "",
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

function UpdateSellerByAdmin({ seller, opened }: any) {
	const CountriesData1 = nationalities.map(
		(item) => `${item.label?.charAt(0).toUpperCase()}${item.label?.slice(1)}`
	);
	const CountriesData2 = nationalities.map(
		(item) => `${item.value?.charAt(0).toUpperCase()}${item.value?.slice(1)}`
	);

	const [fixTel, setFixTel] = useState(0);
	const [obj, setObj] = useState<CreateSellerInput>(initialValues);
	const [createSeller] = useCreateSeller();
	const [updateSeller] = useUpdateSeller();
	const [entName, setEntName] = useState("");
	const [user, setUser] = useState<any>({
		seller: {
			_id: "",
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
			firstName: "",
			lastName: "",
			email: "",
			pseudo: "",
			password: "",
			adress: "",
			companyAdresse: "",
			numberOfEmployees: "",
			civilite: "",
			tvaIntra: "",
			typeCompte: "",
			countryOfResidence: "",
		},
	});
	const router = useRouter();
	const query = router.query;
	// console.log("query: ", query);

	const GET_SELLER = gql`
		query seller($_id: String!) {
			seller(_id: $_id) {
				_id
				nomEntreprise
				pseudo
				numeroSiret
				groupe
				codeNAF
				codePostal
				ville
				departement
				pays
				IBAN
				dateOfBirth
				nationality
				website
				firstName
				lastName
				email
				countryOfResidency
				mobileNumber
				fixNumber
				adresse
			}
		}
	`;

	const { error, loading, data } = useQuery(GET_SELLER, {
		onCompleted: setUser,
		fetchPolicy: "no-cache",
		variables: {
			_id: query.id,
		},
	});

	console.log(data);

	// const date = `${user.seller.dateOfBirth.slice(
	// 	0,
	// 	10
	// )} at ${user.seller.dateOfBirth.slice(11, 16)}`;

	// const jour = date.slice(8, 10);
	// const mois = date.slice(5, 7);
	// const annee = date.slice(0, 4);

	const jour = "12";
	const mois = "05";
	const annee = "1999";
	// const mois = date.slice(5, 7);
	// const annee = date.slice(0, 4);
	// const date = "12/05/1999";

	const rightFormatDate = `${annee}/${mois}/${jour}`;

	const openModal = (e: any) => {
		e.preventDefault();
		return openConfirmModal({
			className: "mt-[200px]",
			confirmProps: {
				className: "bg-green-500 hover:bg-green-600 rounded-2xl",
			},
			cancelProps: {
				className: "rounded-2xl",
			},
			title: "Veuillez confirmer l'edition vendeur",
			children: (
				<p>
					<p>Voulez vous changer les informations de ce vendeur ?</p>
				</p>
			),
			labels: { confirm: "Confirmer", cancel: "Abandonner" },
			onCancel: () => {},
			onConfirm: async () => {
				try {
					const seller = await updateSeller({
						variables: {
							_id: query.id,
							updateSellerInput: {
								nomEntreprise: user.seller.nomEntreprise,
								lastName: user.seller.lastName,
								numeroSiret: Number(user.seller.numeroSiret),
								groupe: user.seller.groupe,
								codeNAF: user.seller.codeNAF,
								codePostal: user.seller.codePostal,
								ville: user.seller.ville,
								role: "Seller",
								IBAN: user.seller.IBAN,
								dateOfBirth: user.seller.dateOfBirth,
								nationality: user.seller.nationality,
								adresse: user.seller.adresse,
								countryOfResidency: user.seller.countryOfResidency,
								departement: user.seller.departement,
								mobileNumber: Number(user.seller.mobileNumber),
								fixNumber: Number(user.seller.fixNumber),
								firstName: user.seller.firstName,
								email: user.seller.email,
								password: user.seller.password,
								// pseudo: user.seller.pseudo,
								website: user.seller.website,
								pays: user.seller.pays,
							},
						},
					});
					showNotification({
						title: "Edition vendeur",
						message: "Vendeur changé avec success",
						color: "green",
						autoClose: 5000,
						bottom: "630px",
					});
				} catch (error) {}
			},
		});
	};

	// async function handleSubmit(e: any) {
	// 	e.preventDefault();
	// 	// console.log("from handle:", user.seller);
	// 	//change here to update

	// 	// setUser({ seller });
	// }

	// const form = useForm({
	// 	initialValues: {
	// 		nomEntreprise: "",
	// 		numeroSiret: "",
	// 		groupe: "",
	// 		codeNAF: "",
	// 		codePostal: "",
	// 		ville: "",
	// 		departement: "",
	// 		pays: "",
	// 		IBAN: "",
	// 		numFixe: "",
	// 		numPortable: "",
	// 		dateOfBirth: "",
	// 		nationality: "",
	// 		website: "",
	// 		prenom: "",
	// 		nom: "",
	// 		email: "",
	// 		pseudo: "",
	// 		password: "",
	// 		adress: "",
	// 		countryOfResidence: "",
	// 	},

	// 	// functions will be used to validate values at corresponding key
	// 	// validate: zodResolver(schema),
	// });

	// useEffect(() => {
	// 	setEntName(user.seller.nomEntreprise);
	// }, []);

	return (
		// <div className="flex justify-center ml-[10%] md:ml-[15%] border">
		<div
			className={`flex justify-center ${
				opened ? "lg:ml-[17%]" : "lg:ml-[10%]"
			}`}
		>
			<form
				// onSubmit={form.onSubmit((values) => {
				// 	// setObj(values);
				// 	console.log("values: ", values);
				// 	handleSubmit();
				// })}
				onSubmit={(e) => openModal(e)}
				// onSubmit={form.onSubmit(console.log)}
				className="flex flex-col justify-center w-full mt-3"
			>
				<div>Edition {user.seller.pseudo}</div>
				{/* <div className="flex justify-center bg-slate-200 w-4/5 rounded-2xl"> */}
				<div
					className={`flex flex-col items-start justify-start pb-[25px] pt-[20px] bg-slate-100 w-4/5 rounded-2xl shadow-2xl`}
				>
					<h2 className="ml-4 mb-2 font-medium">Informations entreprise:</h2>
					<TextInput
						// value={entName}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									nomEntreprise: e.currentTarget.value,
								},
							})
						}
						value={user.seller.nomEntreprise}
						// {...form.getInputProps("nomEntreprise")}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									numeroSiret: e.currentTarget.value,
								},
							})
						}
						value={user.seller.numeroSiret}
						// value={null}
						// {...form.getInputProps("numeroSiret")}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									groupe: e.currentTarget.value,
								},
							})
						}
						value={user.seller.groupe}
						// {...form.getInputProps("groupe")}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									codeNAF: e.currentTarget.value,
								},
							})
						}
						value={user.seller.codeNAF}
						// {...form.getInputProps("codeNAF")}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									codePostal: e.currentTarget.value,
								},
							})
						}
						value={user.seller.codePostal}
						// {...form.getInputProps("codePostal")}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									ville: e.currentTarget.value,
								},
							})
						}
						value={user.seller.ville}
						// {...form.getInputProps("ville")}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									departement: e.currentTarget.value,
								},
							})
						}
						value={user.seller.departement}
						// {...form.getInputProps("departement")}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									pays: e.currentTarget.value,
								},
							})
						}
						value={user.seller.pays}
						// {...form.getInputProps("pays")}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									IBAN: e.currentTarget.value,
								},
							})
						}
						value={user.seller.IBAN}
						// {...form.getInputProps("IBAN")}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									website: e.currentTarget.value,
								},
							})
						}
						value={user.seller.website}
						// {...form.getInputProps("website")}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									pseudo: e.currentTarget.value,
								},
							})
						}
						value={user.seller.pseudo}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									nomEntreprise: e.currentTarget.value,
								},
							})
						}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									nomEntreprise: e.currentTarget.value,
								},
							})
						}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									firstName: e.currentTarget.value,
								},
							})
						}
						value={user.seller.firstName}
						// {...form.getInputProps("prenom")}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									lastName: e.currentTarget.value,
								},
							})
						}
						value={user.seller.lastName}
						// {...form.getInputProps("nom")}
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
						onChange={(e: any) =>
							setUser({
								seller: {
									...user.seller,
									dateOfBirth: e,
								},
							})
						}
						// value={user.seller.dateOfBirth}
						value={new Date(user.seller.dateOfBirth)}
						// {...form.getInputProps("dateOfBirth")}
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
						data={CountriesData1}
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									nationality: e,
								},
							})
						}
						value={user.seller.nationality}
						// {...form.getInputProps("nationality")}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									countryOfResidency: e,
								},
							})
						}
						data={CountriesData2}
						value={user.seller.countryOfResidency}
						// {...form.getInputProps("countryOfResidence")}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									email: e.currentTarget.value,
								},
							})
						}
						value={user.seller.email}
						// {...form.getInputProps("email")}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									password: e.currentTarget.value,
								},
							})
						}
						type={"password"}
						// {...form.getInputProps("password")}
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
							onChange={(e) =>
								setUser({
									seller: {
										...user.seller,
										mobileNumber: e,
									},
								})
							}
							value={user.seller.mobileNumber}
							// {...form.getInputProps("numFixe")}
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
							onChange={(e) =>
								setUser({
									seller: {
										...user.seller,
										fixNumber: e,
									},
								})
							}
							value={user.seller.fixNumber}
							// {...form.getInputProps("numPortable")}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									adresse: e.currentTarget.value,
								},
							})
						}
						value={user.seller.adresse}
						// {...form.getInputProps("adresse")}
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
						onChange={(e) =>
							setUser({
								seller: {
									...user.seller,
									ville: e.currentTarget.value,
								},
							})
						}
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
						// onChange={(e) =>
						// 	setUser({
						// 		seller: {
						// 			...user.seller,
						// 			nomEntreprise: e.currentTarget.value,
						// 		},
						// 	})
						// }
						// {...form.getInputProps("pseudo")}
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

export default UpdateSellerByAdmin;
