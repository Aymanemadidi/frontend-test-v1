import {
	TextInput,
	PasswordInput,
	Checkbox,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Group,
	Button,
	Input,
	Progress,
	Center,
	Box,
	Popover,
	Select,
} from "@mantine/core";
import NotLoggedLayout from "../components/notLoggedLayout";
import { ReactElement, useState } from "react";
import { IconAt, IconCheck, IconX } from "@tabler/icons";
import { useInputState } from "@mantine/hooks";
import { nationalities } from "../helpers/countries";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { DatePicker } from "@mantine/dates";
import { CreateSellerInput, useCreateSeller } from "../hooks/useCreateSeller";
import { useForm, zodResolver } from "@mantine/form";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

function PasswordRequirement({
	meets,
	label,
}: {
	meets: boolean;
	label: string;
}) {
	return (
		<Text color={meets ? "teal" : "red"} mt={5} size="sm">
			<Center inline>
				{meets ? (
					<IconCheck size={14} stroke={1.5} />
				) : (
					<IconX size={14} stroke={1.5} />
				)}
				<Box ml={7}>{label}</Box>
			</Center>
		</Text>
	);
}

const requirements = [
	{ re: /[0-9]/, label: "Includes number" },
	{ re: /[a-z]/, label: "Includes lowercase letter" },
	{ re: /[A-Z]/, label: "Includes uppercase letter" },
	{ re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string) {
	let multiplier = password.length > 5 ? 0 : 1;

	requirements.forEach((requirement) => {
		if (!requirement.re.test(password)) {
			multiplier += 1;
		}
	});

	return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export default function InscriptionVendeur() {
	const data = nationalities.map(
		(item) => `${item.label?.charAt(0).toUpperCase()}${item.label?.slice(1)}`
	);
	const data2 = nationalities.map(
		(item) => `${item.value?.charAt(0).toUpperCase()}${item.value?.slice(1)}`
	);
	const [password, setPassword] = useInputState("");
	const [confirmvalue, setConfirmValue] = useInputState("");
	const strength = getStrength(password);
	const [firstCheck, setFirstCheck] = useState(false);
	const [secondCheck, setSecondCheck] = useState(false);
	const [opened, setOpened] = useState(false);
	const [mobile, setMobile] = useState("");
	const [fix, setFix] = useState("");
	const [createSeller] = useCreateSeller();
	const router = useRouter();
	const [list, setList] = useState<any>([]);
	const [typeId, setTypeId] = useState("");
	// const [dataTypes, setDataTypes] = useState<any>([]);
	let dataTypes: any = [];
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

	const checks = requirements.map((requirement, index) => (
		<PasswordRequirement
			key={index}
			label={requirement.label}
			meets={requirement.re.test(password)}
		/>
	));

	const bars = Array(4)
		.fill(0)
		.map((_, index) => (
			<Progress
				styles={{ bar: { transitionDuration: "0ms" } }}
				value={
					password.length > 0 && index === 0
						? 100
						: strength >= ((index + 1) / 4) * 100
						? 100
						: 0
				}
				color={strength > 80 ? "teal" : strength > 50 ? "yellow" : "red"}
				key={index}
				size={4}
			/>
		));

	async function handleSubmit(values: CreateSellerInput) {
		try {
			const seller = await createSeller({
				variables: {
					createSellerInput: {
						nomEntreprise: values.nomEntreprise,
						numeroSiret: Number(values.numeroSiret),
						groupe: values.groupe,
						codeNAF: values.codeNAF,
						codePostal: values.codePostal,
						ville: values.ville,
						role: "Seller",
						IBAN: values.IBAN,
						dateOfBirth: values.dateOfBirth,
						nationality: values.nationality,
						adresse: values.adresse,
						countryOfResidency: values.countryOfResidence,
						departement: values.departement,
						mobileNumber: Number(mobile),
						fixNumber: Number(fix),
						firstName: values.firstName,
						lastName: values.lastName,
						email: values.email,
						// pseudo: values.nomEntreprise,
						password: password,
						website: values.website,
						pays: values.pays,
						numberOfEmployees: values.numberOfEmployees,
						companyAdresse: values.companyAdresse,
						companyVille: "",
						companyCodePostal: "",
						companyPays: "",
						civilite: values.civilite,
						typeCompte: values.typeCompte,
						tvaIntra: values.tvaIntra,
						refundAdresse: "",
						refundVille: "",
						refundCodePostal: "",
						refundPays: "",
						statut_moderation: false,
						statut: "new",
						isArchived: false,
					},
				},
			});
			console.log(seller);
			router.push("/tableau-de-bord");
		} catch (error) {
			alert("Some error has occured");
		}
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
			firstName: "",
			lastName: "",
			email: "",
			pseudo: "",
			password: "",
			adresse: "",
			numberOfEmployees: "",
			civilite: "",
			tvaIntra: "",
			typeCompte: "",
			countryOfResidence: "",
			companyAdresse: "",
			companyVille: "",
			companyCodePostal: "",
			companyPays: "",
			statutLegal: "",
			refundAdresse: "",
			refundVille: "",
			refundCodePostal: "",
			refundPays: "",
		},

		// functions will be used to validate values at corresponding key
		// validate: zodResolver(schema),
	});

	return (
		<form
			className="mb-5"
			onSubmit={form.onSubmit((values) => {
				// setObj(values);
				handleSubmit(values);
			})}
		>
			<div className="flex flex-col m-auto justify-center items-center bg-white shadow-lg w-[80%] rounded-2xl py-4 px-4 font-normal gap-3 pb-[40px]">
				<div className="flex flex-col justify-start w-full">
					<p className="text-lg font-bold">S'inscrire ?</p>
					<p className="text-md font-normal">Le début de la réussite.</p>
				</div>
				<div className="flex flex-col md:flex-row items-center justify-center w-full gap-2">
					<div className="w-full md:w-1/3">
						<TextInput
							icon={<IconAt />}
							placeholder="votre email"
							label={"E-mail"}
							withAsterisk
							classNames={{
								// root: "w-1/3",
								input: "rounded-lg",
							}}
							{...form.getInputProps("email")}
						/>
					</div>
					<div className="md:w-1/3 w-full">
						<Popover opened={opened} onChange={setOpened}>
							<Popover.Target>
								<PasswordInput
									value={password}
									onChange={setPassword}
									placeholder="Votre mot de passe"
									label="Mot de passe"
									required
									classNames={{
										// root: "w-[350px]",
										input: "rounded-lg",
									}}
									onFocusCapture={() => setOpened((o) => !o)}
									// {...form.getInputProps("password")}
								/>
							</Popover.Target>
							<Popover.Dropdown>
								<div className="m-auto">
									<Group spacing={5} grow mt="xs" mb="md">
										{bars}
									</Group>

									<PasswordRequirement
										label="Has at least 6 characters"
										meets={password.length > 5}
									/>
									{checks}
								</div>
							</Popover.Dropdown>
						</Popover>
					</div>
					<div className="md:w-1/3 w-full">
						<PasswordInput
							value={confirmvalue}
							onChange={setConfirmValue}
							placeholder="Retaper votre mot de passe"
							label="Confirmer le mot de passe"
							required
							error={password !== confirmvalue}
							classNames={{
								// root: "w-[350px]",
								input: "rounded-lg",
							}}
						/>
					</div>
				</div>
			</div>
			<div className="mt-5 flex flex-col m-auto justify-center items-center bg-white shadow-lg w-[80%] rounded-2xl py-4 px-4 font-normal gap-3 pb-[40px]">
				<div className="flex flex-col justify-start w-full">
					<p className="text-lg font-bold">Informations de l’entreprise</p>
				</div>
				<div className="flex flex-col items-center justify-center w-full gap-2">
					<div className="w-full">
						<TextInput
							// icon={<IconAt />}
							placeholder="votre numero SIRET"
							label={"Numéro SIRET"}
							withAsterisk
							classNames={{
								// root: "w-1/3",
								input: "rounded-lg",
							}}
							{...form.getInputProps("numeroSiret")}
						/>
					</div>
					<div className="flex flex-col md:flex-row w-full gap-2">
						<div className="md:w-1/3 w-full">
							<TextInput
								// icon={<IconAt />}
								placeholder="Le nom de votre entreprise"
								label={"Nom de l'entreprise"}
								withAsterisk
								classNames={{
									// root: "w-1/3",
									input: "rounded-lg",
								}}
								{...form.getInputProps("nomEntreprise")}
							/>
						</div>
						<div className="md:w-1/3 w-full">
							<TextInput
								// icon={<IconAt />}
								placeholder="votre TVA intracommunautaire"
								label={"TVA intracommunautaire"}
								classNames={{
									// root: "w-1/3",
									input: "rounded-lg",
								}}
								{...form.getInputProps("tvaIntra")}
							/>
						</div>
						<div className="md:w-1/3 w-full">
							<Select
								// icon={<IconAt />}
								label={"Type du compte"}
								withAsterisk
								classNames={{
									// root: "w-1/3",
									input: "rounded-lg",
								}}
								data={dataTypes}
								placeholder="Type de compte"
								defaultValue={"Entreprise"}
								{...form.getInputProps("typeCompte")}
							/>
						</div>
					</div>
					<div className="w-full">
						<TextInput
							// icon={<IconAt />}
							placeholder="L'adresse de votre entreprise"
							label={"Adresse de l’entreprise"}
							withAsterisk
							classNames={{
								// root: "w-1/3",
								input: "rounded-lg",
							}}
							{...form.getInputProps("companyAdresse")}
						/>
					</div>
					<div className="flex flex-col md:flex-row w-full gap-2">
						<div className="md:w-1/3 w-full">
							<TextInput
								// icon={<IconAt />}
								placeholder="Ville ou est basé votre société"
								label={"Ville"}
								withAsterisk
								classNames={{
									// root: "w-1/3",
									input: "rounded-lg",
								}}
								{...form.getInputProps("companyVille")}
							/>
						</div>
						<div className="md:w-1/3 w-full">
							<TextInput
								// icon={<IconAt />}
								placeholder="Code postal de votre société"
								label={"Code Postal"}
								classNames={{
									// root: "w-1/3",
									input: "rounded-lg",
								}}
								withAsterisk
								{...form.getInputProps("companyCodePostal")}
							/>
						</div>
						<div className="md:w-1/3 w-full">
							<TextInput
								// icon={<IconAt />}
								placeholder="Votre site web"
								label={"Site Web"}
								classNames={{
									// root: "w-1/3",
									input: "rounded-lg",
								}}
								{...form.getInputProps("website")}
							/>
						</div>
					</div>
					<div className="flex flex-col md:flex-row w-full gap-2">
						<div className="md:w-1/3 w-full">
							<Select
								// icon={<IconAt />}
								label={"Pays"}
								placeholder="Pays ou est basé votre société"
								withAsterisk
								classNames={{
									// root: "w-1/3",
									input: "rounded-lg",
								}}
								data={data2}
								defaultValue={""}
								{...form.getInputProps("companyPays")}
							/>
						</div>
						<div className="md:w-1/3 w-full">
							<TextInput
								// icon={<IconAt />}
								placeholder="Département"
								label={"Département"}
								classNames={{
									// root: "w-1/3",
									input: "rounded-lg",
								}}
								{...form.getInputProps("departement")}
							/>
						</div>
						<div className="md:w-1/3 w-full">
							<Select
								// icon={<IconAt />}
								placeholder="Nombre de salariés"
								label={"Nombre de salariés"}
								classNames={{
									// root: "w-1/3",
									input: "rounded-lg",
								}}
								withAsterisk
								data={[
									{ value: "<10", label: "Moins de 10" },
									{ value: "11-249", label: "Entre 11 et 249" },
									{ value: "250-4999", label: "Entre 250 et 4999" },
									{ value: ">4999", label: "plus de 4999" },
								]}
								{...form.getInputProps("numberOfEmployees")}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-5 flex flex-col m-auto justify-center items-center bg-white shadow-lg w-[80%] rounded-2xl py-4 px-4 font-normal gap-3 pb-[40px]">
				<div className="flex flex-col justify-start w-full">
					<p className="text-lg font-bold">Informations de contact</p>
				</div>
				<div className="flex flex-col items-center justify-center w-full gap-2">
					{/* <div className="w-full">
						<Select
							// icon={<IconAt />}
							placeholder="votre numero SIRET"
							label={"Numéro SIRET"}
							withAsterisk
							classNames={{
								// root: "w-1/3",
								input: "rounded-lg",
							}}
							data={[
								{ value: "m", label: "Monsieur" },
								{ value: "mm", label: "Madame" },
							]}
						/>
					</div> */}
					<div className="flex flex-col md:flex-row w-full gap-2">
						<div className="md:w-1/3 w-full">
							<Select
								// icon={<IconAt />}
								placeholder="Choisir civilité"
								label={"Civilité"}
								withAsterisk
								classNames={{
									// root: "w-1/3",
									input: "rounded-lg",
								}}
								data={[
									{ value: "m", label: "Monsieur" },
									{ value: "mm", label: "Madame" },
								]}
								{...form.getInputProps("civilite")}
							/>
						</div>
						<div className="md:w-1/3 w-full">
							<TextInput
								// icon={<IconAt />}
								placeholder="Votre Nom"
								label={"Nom"}
								withAsterisk
								classNames={{
									// root: "w-1/3",
									input: "rounded-lg",
								}}
								{...form.getInputProps("lastName")}
							/>
						</div>
						<div className="md:w-1/3 w-full">
							<TextInput
								// icon={<IconAt />}
								placeholder="Votre Prénom"
								label={"Prénom"}
								withAsterisk
								classNames={{
									// root: "w-1/3",
									input: "rounded-lg",
								}}
								{...form.getInputProps("firstName")}
							/>
						</div>
					</div>
					<div className="w-full">
						<TextInput
							// icon={<IconAt />}
							placeholder="Votre adresse"
							label={"Adresse"}
							withAsterisk
							classNames={{
								// root: "w-1/3",
								input: "rounded-lg",
							}}
							{...form.getInputProps("adresse")}
						/>
					</div>
					<div className="flex flex-col md:flex-row w-full gap-2">
						<div className="md:w-1/2 w-full">
							<TextInput
								// icon={<IconAt />}
								placeholder="Votre ville"
								label={"Ville"}
								withAsterisk
								classNames={{
									// root: "w-1/3",
									input: "rounded-lg",
								}}
								{...form.getInputProps("ville")}
							/>
						</div>
						<div className="md:w-1/2 w-full">
							<TextInput
								// icon={<IconAt />}
								placeholder="Votre code postal"
								label={"Code postal"}
								withAsterisk
								classNames={{
									// root: "w-1/3",
									input: "rounded-lg",
								}}
								{...form.getInputProps("codePostal")}
							/>
						</div>
					</div>
					<div className="flex flex-col md:flex-row w-full gap-2">
						<div className="md:w-1/2 w-full">
							<Select
								// icon={<IconAt />}
								label={"Pays"}
								placeholder="Chosir pays"
								withAsterisk
								classNames={{
									// root: "w-1/3",
									input: "rounded-lg",
								}}
								data={data2}
								defaultValue={""}
								{...form.getInputProps("pays")}
							/>
						</div>
						<div className="md:w-1/2 w-full">
							<TextInput
								// icon={<IconAt />}
								placeholder="Département"
								label={"Département"}
								classNames={{
									// root: "w-1/3",
									input: "rounded-lg",
								}}
								{...form.getInputProps("departement")}
							/>
						</div>
					</div>
					<div className="flex flex-col md:flex-row w-full gap-2">
						<div className=" flex flex-col md:w-1/2 w-full">
							<p className="text-[15px] font-normal">
								Numéro de téléphone fixe
							</p>
							<div>
								<PhoneInput
									country={"fr"}
									// containerClass="mt-3"
									inputClass="h-[5px]"
									inputStyle={{
										borderRadius: "10px",
										width: "100%",
										borderColor: "#DEDEDE",
									}}
									specialLabel=""
									// value={user.seller.mobileNumber}
									// {...form.getInputProps("numFixe")}
									// value={this.state.phone}
									value={fix}
									onChange={(e) => setFix(e)}
									// onChange={(phone) => this.setState({ phone })}
									// {...form.getInputProps("fixNumber")}
								/>
							</div>
						</div>
						<div className=" flex flex-col md:w-1/2 w-full">
							<p className="text-[15px] font-normal">
								Numéro de téléphone portable{" "}
								<span className="text-red-500">*</span>
							</p>
							<div>
								<PhoneInput
									country={"fr"}
									// containerClass="mt-3"
									inputClass="h-[5px]"
									inputStyle={{
										borderRadius: "10px",
										width: "100%",
										borderColor: "#DEDEDE",
									}}
									specialLabel=""
									value={mobile}
									onChange={(e) => setMobile(e)}
									// value={user.seller.mobileNumber}
									// {...form.getInputProps("numFixe")}
									// value={this.state.phone}
									// onChange={(phone) => this.setState({ phone })}
								/>
							</div>
						</div>
					</div>
					<div className="flex flex-col md:flex-row w-full gap-2">
						<div className="md:w-1/3 w-full">
							<DatePicker
								placeholder="Date de naissance"
								classNames={{
									wrapper: "w-full",
									input:
										"rounded-md font-normal placeholder:font-normal  border-slate-200 border-[#DEDEDE] px-1",
									label: "",
								}}
								className="flex flex-col gap-[2px] justify-start items-start w-full"
								label="Date de naissance"
								withAsterisk
								// value={user.seller.dateOfBirth}
								// value={new Date(user.seller.dateOfBirth)}
								{...form.getInputProps("dateOfBirth")}
							/>
						</div>
						<div className="md:w-1/3 w-full">
							<Select
								// icon={<IconAt />}
								label={"Pays de residence"}
								placeholder="Chosir pays"
								withAsterisk
								classNames={{
									// root: "w-1/3",
									input: "rounded-lg",
								}}
								data={data2}
								defaultValue={""}
								{...form.getInputProps("countryOfResidency")}
							/>
						</div>
						<div className="md:w-1/3 w-full">
							<Select
								// icon={<IconAt />}
								label={"Nationalité"}
								placeholder="Votre nationalité"
								withAsterisk
								classNames={{
									// root: "w-1/3",
									input: "rounded-lg",
								}}
								data={data}
								defaultValue={""}
								{...form.getInputProps("nationality")}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center items-center gap-2 font-normal">
				<div className="flex flex-col gap-1 w-[80%] px-[20px] py-[20px]">
					<div className="">
						<Checkbox
							onChange={() => setFirstCheck(!firstCheck)}
							label="Nous vérifions les SIRET, pour nous assurer que Spare-Place reste uniquement dédié aux industriels."
						/>
					</div>
					<div className="">
						<Checkbox
							onChange={() => setSecondCheck(!secondCheck)}
							label={
								<div>
									J'ai lu et j'accepte{" "}
									<span className="text-green-500 cursor-pointer">
										La politique de confidentialité
									</span>{" "}
									-{" "}
									<span className="text-green-500 cursor-pointer">
										les conditions générales d'utilisation
									</span>{" "}
									-{" "}
									<span className="text-green-500 cursor-pointer">
										les Conditions Générales de Service
									</span>
									.
								</div>
							}
						/>
					</div>
				</div>
			</div>
			<div className="flex justify-center font-normal">
				<div className="flex justify-center gap-1 w-[80%]">
					<div className="border text-center w-full">
						<Button
							disabled={firstCheck === false || secondCheck === false}
							className="bg-green-500 w-full py-2 rounded-md"
							type="submit"
						>
							Valider
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}

InscriptionVendeur.getLayout = (page: ReactElement) => {
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
