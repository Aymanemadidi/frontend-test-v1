import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { TextInput, Button } from "@mantine/core";
import { Select } from "@mantine/core";
import { nationalities } from "../../../helpers/countries";
import "react-phone-input-2/lib/material.css";
import { IconChevronDown, IconChevronRight } from "@tabler/icons";
import { useRouter } from "next/router";
import {
	CreateSellerInput,
	useCreateSellerByAdm,
} from "../../../hooks/useCreateSellerByAdmin";
import {
	getbars,
	getchecks,
	getStrength,
} from "../../../utils/passwordCheckUtils";
import { getForm } from "../../../utils/intialValues";
import { ContactForm, EntrepriseForm } from "../../../components/FormSections";

const d = new Date();

function Demo() {
	const data = nationalities.map(
		(item) => `${item.label?.charAt(0).toUpperCase()}${item.label?.slice(1)}`
	);
	const data2 = nationalities.map(
		(item) => `${item.value?.charAt(0).toUpperCase()}${item.value?.slice(1)}`
	);
	const [createSellerByAdm] = useCreateSellerByAdm();
	const [pageSelected, setPageSelected] = useState("general");
	const [list, setList] = useState<any>([]);
	const [typeId, setTypeId] = useState("63c8092dfe9bcce12f8d7785");
	const [password, setPassword] = useState("");
	const strength = getStrength(password);
	// const [confirmValue, setConfirmValue] = useState("");
	const [opened, setOpened] = useState(false);
	let dataTypes: any = [];
	const router = useRouter();
	console.log("router.query: ", router.query);

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
			.filter((type: any) => type.for_seller === true)
			.map((type: any) => {
				return { label: type.libelle, value: type._id };
			});
	}

	console.log("dataTypes: ", list.typeUsers);

	async function handleSubmit(values: CreateSellerInput) {
		try {
			const seller = await createSellerByAdm({
				variables: {
					createSellerInput: {
						nomEntreprise: values.nomEntreprise,
						lastName: values.lastName,
						numeroSiret: Number(values.numeroSiret),
						groupe: values.groupe,
						codeNAF: values.codeNAF,
						codePostal: values.codePostal,
						ville: values.ville,
						// role: "Seller",
						IBAN: values.IBAN,
						dateOfBirth: values.dateOfBirth,
						nationality: values.nationality,
						adresse: values.adresse,
						countryOfResidency: values.countryOfResidency,
						departement: values.departement,
						mobileNumber: Number(values.numPortable),
						fixNumber: Number(values.numFixe),
						firstName: values.firstName,
						email: values.email,
						password: values.password,
						website: values.website,
						pays: values.pays,
						numberOfEmployees: "<10",
						companyAdresse: values.companyAdresse,
						tvaIntra: values.tvaIntra,
						companyCodePostal: values.companyCodePostal,
						companyVille: values.companyVille,
						companyPays: values.companyPays,
						statut_moderation: false,
						statut: "new",
						typeCompte: typeId,
						statutLegal: values.statutLegal,
						civilite: values.civilite,
						refundAdresse: values.refundAdresse,
						refundCodePostal: values.refundCodePostal,
						refundVille: values.refundVille,
						refundPays: values.refundPays,
						isArchived: false,
						isPro: router.query.isPro === "true" ? true : false,
					},
				},
			});
			console.log(seller);
			router.push("/utilisateurs/vendeurs");
		} catch (error) {
			alert(error);
		}
	}

	const checks = getchecks(password);

	const bars = getbars(password, strength);

	const form = getForm();

	return (
		<div className="flex justify-center gap-[60px] ml-[10%]  md:ml-[15%] w-[100%] lg:w-[90%]">
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
				className={`${
					pageSelected === "general" ? "flex" : "hidden"
				} flex-col justify-center w-full mt-3`}
			>
				<div>Ajouter Vendeur {router.query.isPro === "true" ? "Pro" : ""}</div>
				<div className="flex flex-col items-start justify-start pb-[25px] pt-[20px] bg-slate-100 w-4/5 rounded-2xl shadow-2xl">
					<h2 className="ml-4 mb-2 font-medium">Informations entreprise:</h2>
					<EntrepriseForm
						form={form}
						setTypeId={setTypeId}
						isType={true}
						dataTypes={dataTypes}
					/>
				</div>
				<div className="flex flex-col items-start justify-start mt-5 pb-[25px] pt-[20px] bg-slate-100 w-4/5 rounded-2xl shadow-2xl">
					<h2 className="ml-4 mb-2">Informations de contact</h2>
					<ContactForm
						form={form}
						opened={opened}
						onChange={setOpened}
						password={password}
						strength={strength}
						setPassword={setPassword}
						setOpened={setOpened}
						bars={bars}
						checks={checks}
					/>
				</div>
				<div className="flex flex-col items-start justify-start mt-5 pb-[25px] pt-[20px] bg-slate-100 w-4/5 rounded-2xl shadow-2xl">
					<h2 className="ml-4 mb-2">Informations de retour</h2>

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
						{...form.getInputProps("refundAdresse")}
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
						{...form.getInputProps("refundVille")}
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
						{...form.getInputProps("refundCodePostal")}
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
						placeholder="Pays"
						{...form.getInputProps("refundPays")}
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
