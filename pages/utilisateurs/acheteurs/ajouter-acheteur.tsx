import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

import { NumberInput, TextInput, Button } from "@mantine/core";
import "react-phone-input-2/lib/material.css";
import {
	CreateBuyerInput,
	useCreateBuyerByAdm,
} from "../../../hooks/useCreateBuyerByAdmin";
import { IconChevronDown, IconChevronRight } from "@tabler/icons";
import { useRouter } from "next/router";
import { ContactForm, EntrepriseForm } from "../../../components/FormSections";
import {
	getbars,
	getchecks,
	getStrength,
} from "../../../utils/passwordCheckUtils";
import { getBuyerForm } from "../../../utils/intialValues";

function Demo() {
	const [createBuyerByAdm] = useCreateBuyerByAdm();
	const [pageSelected, setPageSelected] = useState("general");
	const [phoneCountry, setPhoneCountry] = useState("fr");
	const [list, setList] = useState<any>([]);
	const [typeId, setTypeId] = useState("63c8092dfe9bcce12f8d7785");
	const [password, setPassword] = useState("");
	const strength = getStrength(password);
	const [confirmValue, setConfirmValue] = useState("");
	const [opened, setOpened] = useState(false);
	let dataTypes: any = [];
	const router = useRouter();

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
				return { label: type.libelle, value: type._id };
			});
	}

	async function handleSubmit(values: CreateBuyerInput) {
		try {
			console.log(values);
			const buyers = await createBuyerByAdm({
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
						typeCompte: typeId,
						statut: "new",
						isArchived: false,
					},
				},
			});
			console.log(buyers);
			router.push("/utilisateurs/acheteurs");
		} catch (error) {
			alert(error);
		}
	}

	const checks = getchecks(password);
	const bars = getbars(password, strength);
	const form = getBuyerForm();

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
							<p className={`font-semibold`}>G??neral</p>
						</div>
					</div>
				</div>
			</div>
			<form
				onSubmit={form.onSubmit((values) => {
					handleSubmit(values);
				})}
				className={`${
					pageSelected === "general" ? "flex" : "hidden"
				} flex-col justify-center w-full mt-3`}
			>
				<div>Ajouter un acheteur</div>
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
