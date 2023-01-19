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
import { CreateBuyerInput, useCreateBuyer } from "../../hooks/useCreateBuyer";
import { UpdateBuyerInput, useUpdateBuyer } from "../../hooks/useUpdateBuyer";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
import { openConfirmModal } from "@mantine/modals";

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

function UpdatebuyerByAdmin({ buyer, opened }: any) {
	const CountriesData1 = nationalities.map(
		(item) => `${item.label?.charAt(0).toUpperCase()}${item.label?.slice(1)}`
	);
	const CountriesData2 = nationalities.map(
		(item) => `${item.value?.charAt(0).toUpperCase()}${item.value?.slice(1)}`
	);

	const [fixTel, setFixTel] = useState(0);
	const [obj, setObj] = useState<CreateBuyerInput>(initialValues);
	const [createBuyer] = useCreateBuyer();
	const [updateBuyer] = useUpdateBuyer();
	const [entName, setEntName] = useState("");
	const [list, setList] = useState<any>([]);
	let dataTypes: any[] = [];
	const [user, setUser] = useState<any>({
		buyer: {
			_id: "",
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
			typeCompte: "",
			countryOfResidency: "",
			type: {
				libelle: "",
			},
		},
	});
	const router = useRouter();
	const query = router.query;
	// console.log("query: ", query);

	const GET_BUYER = gql`
		query buyer($_id: String!) {
			buyer(_id: $_id) {
				_id
				nomEntreprise
				pseudo
				numeroSiret
				codePostal
				ville
				departement
				pays
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
				companyAdresse
				companyVille
				companyCodePostal
				type {
					_id
					libelle
				}
			}
		}
	`;

	const { error, loading, data } = useQuery(GET_BUYER, {
		onCompleted: setUser,
		fetchPolicy: "no-cache",
		variables: {
			_id: query.id,
		},
	});

	const ALL_TYPES = gql`
		query TypeUsers {
			typeUsers {
				_id
				libelle
				created_at
				for_buyer
				for_seller
			}
		}
	`;

	const allTypesResult = useQuery(ALL_TYPES, {
		onCompleted: setList,
		fetchPolicy: "no-cache",
	});

	if (allTypesResult.data) {
		dataTypes = list.typeUsers
			.filter((type: any) => type.for_buyer === true)
			.map((type: any) => {
				return {
					label: type.libelle,
					value: type._id,
				};
			});
	}

	console.log(data);

	// const date = `${user.buyer.dateOfBirth.slice(
	// 	0,
	// 	10
	// )} at ${user.buyer.dateOfBirth.slice(11, 16)}`;

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
				console.log("confirm");
				try {
					const buyer = await updateBuyer({
						variables: {
							_id: query.id,
							updateBuyerInput: {
								nomEntreprise: user.buyer.nomEntreprise,
								lastName: user.buyer.lastName,
								numeroSiret: Number(user.buyer.numeroSiret),
								codePostal: user.buyer.codePostal,
								ville: user.buyer.ville,
								companyVille: user.buyer.companyVille,
								companyCodePostal: user.buyer.companyCodePostal,
								role: "Buyer",
								dateOfBirth: user.buyer.dateOfBirth,
								nationality: user.buyer.nationality,
								adresse: user.buyer.adresse,
								countryOfResidency: user.buyer.countryOfResidency,
								departement: user.buyer.departement,
								mobileNumber: Number(user.buyer.mobileNumber),
								fixNumber: Number(user.buyer.fixNumber),
								firstName: user.buyer.firstName,
								// email: user.buyer.email,
								password: user.buyer.password,
								// pseudo: user.buyer.pseudo,
								typeCompte: user.buyer.typeCompte,
								website: user.buyer.website,
								pays: user.buyer.pays,
							},
						},
					});
					showNotification({
						title: "Edition acheteur",
						message: "Acheteur changé avec success",
						color: "green",
						autoClose: 5000,
						bottom: "630px",
					});
				} catch (error) {
					alert(error);
				}
			},
		});
	};

	// async function handleSubmit(e: any) {
	// 	e.preventDefault();
	// 	// console.log("from handle:", user.buyer);
	// 	//change here to update

	// 	// setUser({ buyer });
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
	// 	setEntName(user.buyer.nomEntreprise);
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
				<div>Edition {user.buyer.pseudo}</div>
				{/* <div className="flex justify-center bg-slate-200 w-4/5 rounded-2xl"> */}
				<div
					className={`flex flex-col items-start justify-start pb-[25px] pt-[20px] bg-slate-100 w-4/5 rounded-2xl shadow-2xl`}
				>
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
						onChange={(e) =>
							setUser({
								buyer: {
									...user.buyer,
									nomEntreprise: e.currentTarget.value,
								},
							})
						}
						value={user.buyer.nomEntreprise}
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
								buyer: {
									...user.buyer,
									numeroSiret: e.currentTarget.value,
								},
							})
						}
						value={user.buyer.numeroSiret}
					/>

					<Select
						allowDeselect
						label="Type de compte"
						placeholder="Type de compte"
						searchable
						nothingFound="No options"
						classNames={{
							input:
								"rounded-2xl font-normal placeholder:font-thin placeholder:text-gray-600 border-slate-200 mt-1",
							label: "ml-1",
						}}
						className="ml-3 mt-3 flex flex-col gap-1 justify-start items-start"
						maxDropdownHeight={280}
						data={dataTypes}
						// data={[
						// 	{ label: "test1", value: "test1V" },
						// 	{ label: "test2", value: "test2V" },
						// ]}
						onChange={(e: any) => {
							console.log("e: ", e);
							setUser({
								buyer: {
									...user.buyer,
									typeCompte: e,
									type: {
										_id: e,
									},
								},
							});
						}}
						// value={user.seller.typeCompte}
						value={user.buyer.type["_id"]}
						// defaultValue={user.seller.type._id}
						// {...form.getInputProps("nationality")}
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
								buyer: {
									...user.buyer,
									companyCodePostal: e.currentTarget.value,
								},
							})
						}
						value={user.buyer.companyCodePostal}
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
								buyer: {
									...user.buyer,
									companyVille: e.currentTarget.value,
								},
							})
						}
						value={user.buyer.companyVille}
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
								buyer: {
									...user.buyer,
									departement: e.currentTarget.value,
								},
							})
						}
						value={user.buyer.departement}
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
								buyer: {
									...user.buyer,
									pays: e.currentTarget.value,
								},
							})
						}
						value={user.buyer.companyPays}
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
								buyer: {
									...user.buyer,
									website: e.currentTarget.value,
								},
							})
						}
						value={user.buyer.website}
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
								buyer: {
									...user.buyer,
									pseudo: e.currentTarget.value,
								},
							})
						}
						value={user.buyer.pseudo}
					/>
				</div>
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
						onChange={(e) =>
							setUser({
								buyer: {
									...user.buyer,
									firstName: e.currentTarget.value,
								},
							})
						}
						value={user.buyer.firstName}
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
								buyer: {
									...user.buyer,
									lastName: e.currentTarget.value,
								},
							})
						}
						value={user.buyer.lastName}
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
								buyer: {
									...user.buyer,
									dateOfBirth: e,
								},
							})
						}
						value={new Date(user.buyer.dateOfBirth)}
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
								buyer: {
									...user.buyer,
									nationality: e,
								},
							})
						}
						value={user.buyer.nationality}
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
								buyer: {
									...user.buyer,
									countryOfResidency: e,
								},
							})
						}
						data={CountriesData2}
						value={user.buyer.countryOfResidency}
					/>
					{/* <TextInput
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
								buyer: {
									...user.buyer,
									email: e.currentTarget.value,
								},
							})
						}
						value={user.buyer.email}
					/> */}
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
								buyer: {
									...user.buyer,
									password: e.currentTarget.value,
								},
							})
						}
						type={"password"}
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
									buyer: {
										...user.buyer,
										mobileNumber: e,
									},
								})
							}
							value={
								user.buyer.mobileNumber
									? user.buyer.mobileNumber.toString()
									: ""
							}
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
									buyer: {
										...user.buyer,
										fixNumber: e,
									},
								})
							}
							value={
								user.buyer.fixNumber ? user.buyer.fixNumber.toString() : ""
							}
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
								buyer: {
									...user.buyer,
									adresse: e.currentTarget.value,
								},
							})
						}
						value={user.buyer.adresse}
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
								buyer: {
									...user.buyer,
									ville: e.currentTarget.value,
								},
							})
						}
						value={user.buyer.ville}
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
								buyer: {
									...user.buyer,
									codePostal: e.currentTarget.value,
								},
							})
						}
						value={user.buyer.codePostal}
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

export default UpdatebuyerByAdmin;
