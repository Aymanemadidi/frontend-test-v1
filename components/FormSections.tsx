import { Select } from "tabler-icons-react";
import {
	FormDateField,
	FormSelectField,
	FormTextField,
	PasswordField,
	PhoneField,
} from "./FromFields";
import { nationalities } from "../helpers/countries";

export function EntrepriseForm({ form, setTypeId, isType, dataTypes }: any) {
	const data = nationalities.map(
		(item) => `${item.label?.charAt(0).toUpperCase()}${item.label?.slice(1)}`
	);
	const data2 = nationalities.map(
		(item) => `${item.value?.charAt(0).toUpperCase()}${item.value?.slice(1)}`
	);
	return (
		<>
			<FormTextField
				placeholderField="Nom de l'entreprise"
				pField="Nom de l'entreprise"
				form={form}
				tooltipMessage="Entrez le nom de l'entreprise"
				formInput="nomEntreprise"
			/>
			<FormTextField
				placeholderField="Numerot SIRET"
				pField="Numerot SIRET"
				form={form}
				tooltipMessage="Entrez votre numerot SIRET"
				formInput="numeroSiret"
			/>
			<FormTextField
				placeholderField="Groupe"
				pField="Groupe"
				form={form}
				tooltipMessage="Entrez votre Groupe"
				formInput="groupe"
			/>
			<FormTextField
				placeholderField="Code NAF"
				pField="Code NAF"
				form={form}
				tooltipMessage="Entrez votre Code NAF"
				formInput="codeNAF"
			/>
			{/* <FormTextField
				placeholderField="Code NAF"
				pField="Code NAF"
				form={form}
				tooltipMessage="Entrez votre Code NAF"
				formInput="codeNAF"
			/> */}
			<FormTextField
				placeholderField="Code postal"
				pField="Code postal"
				form={form}
				tooltipMessage="Entrez votre Code postal"
				formInput="companyCodePostal"
			/>
			<FormTextField
				placeholderField="Adresse de votre société"
				pField="Adresse"
				form={form}
				tooltipMessage="Entrez votre Code postal"
				formInput="companyAdresse"
			/>
			<FormTextField
				placeholderField="Statut legal"
				pField="Statut legal"
				form={form}
				tooltipMessage="Statut legal"
				formInput="statutLegal"
			/>
			<FormSelectField
				labelField="Type compte"
				dataArr={dataTypes}
				placeholderField="Type compte"
				form={form}
				isType={isType}
				setTypeId={setTypeId}
			/>
			<FormTextField
				placeholderField="Ville de votre société"
				pField="Ville"
				form={form}
				tooltipMessage="Ville de votre société"
				formInput="companyVille"
			/>
			<FormTextField
				placeholderField="Departement"
				pField="Departement"
				form={form}
				tooltipMessage="Departement"
				formInput="departement"
			/>
			<FormTextField
				placeholderField="IBAN"
				pField="IBAN"
				form={form}
				tooltipMessage="IBAN"
				formInput="IBAN"
			/>
			<FormTextField
				placeholderField="Site Web"
				pField="Site Web"
				form={form}
				tooltipMessage="Site Web"
				formInput="website"
			/>
			<FormSelectField
				labelField="Pays"
				dataArr={data2}
				placeholderField="Pays de votre société"
				formInput="companyPays"
				form={form}
			/>
		</>
	);
}

export function ContactForm({
	form,
	opened,
	onChange,
	password,
	strength,
	setPassword,
	setOpened,
	bars,
	checks,
}: any) {
	const data = nationalities.map(
		(item) => `${item.label?.charAt(0).toUpperCase()}${item.label?.slice(1)}`
	);
	const data2 = nationalities.map(
		(item) => `${item.value?.charAt(0).toUpperCase()}${item.value?.slice(1)}`
	);
	return (
		<>
			<FormSelectField
				labelField="Civilité"
				dataArr={[
					{
						label: "Monsieur",
						value: "m",
					},
					{
						label: "Madame",
						value: "mm",
					},
				]}
				placeholderField="Civilité"
				formInput="civilite"
				form={form}
			/>
			<FormTextField
				placeholderField="Prénom"
				pField="Prénom"
				form={form}
				tooltipMessage=""
				formInput="firstName"
			/>
			<FormTextField
				placeholderField="Nom"
				pField="Nom"
				form={form}
				tooltipMessage=""
				formInput="lastName"
			/>
			<FormDateField
				labelField="Date de naissance"
				placeholderField="Date de naissance"
				formInput="dateOfBirth"
				form={form}
			/>
			<FormSelectField
				labelField="Nationalité"
				dataArr={data}
				placeholderField="Nationalité"
				formInput="nationality"
				form={form}
			/>
			<FormSelectField
				labelField="Pays de residence"
				dataArr={data2}
				placeholderField="Pays de residence"
				formInput="countryOfResidency"
				form={form}
			/>
			<FormTextField
				placeholderField="Email"
				pField="Email"
				form={form}
				tooltipMessage="Entrez le nom de l'entreprise"
				formInput="email"
			/>
			<PasswordField
				opened={opened}
				onChange={setOpened}
				password={password}
				strength={strength}
				setPassword={setPassword}
				setOpened={setOpened}
				bars={bars}
				checks={checks}
			/>
			<PhoneField
				form={form}
				formInput="numFixe"
				pField="Numéro de téléphone fixe"
			/>
			<PhoneField
				form={form}
				formInput="numPortable"
				pField="Numéro de téléphone portable"
			/>
			<FormTextField
				placeholderField="Adresse"
				pField="Adresse"
				form={form}
				tooltipMessage="Entrez le nom de l'entreprise"
				formInput="adresse"
			/>
			<FormTextField
				placeholderField="Ville"
				pField="Ville"
				form={form}
				tooltipMessage="Entrez le nom de l'entreprise"
				formInput="ville"
			/>
			<FormTextField
				placeholderField="Code postal"
				pField="Code postal"
				form={form}
				tooltipMessage="Entrez le nom de l'entreprise"
				formInput="codePostal"
			/>
			<FormSelectField
				labelField="Pays"
				dataArr={data}
				placeholderField="Pays"
				formInput="pays"
				form={form}
			/>
		</>
	);
}
