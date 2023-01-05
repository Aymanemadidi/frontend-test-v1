import { gql, useMutation } from "@apollo/client";

export interface UpdateSellerInput {
	nomEntreprise: string;
	numeroSiret: string;
	groupe: string;
	codeNAF: string;
	codePostal: string;
	ville: string;
	departement: string;
	pays: string;
	IBAN: string;
	numFixe: string;
	numPortable: string;
	website: string;
	dateOfBirth: string;
	nationality: string;
	prenom: string;
	nom: string;
	email: string;
	pseudo: string;
	password: string;
	adress: string;
	countryOfResidence: string;
}

interface SellerUpdated {
	access_token: string;
	refresh_token: string;
}

const UPDATE_SELLER = gql`
	mutation updateSeller($_id: String!, $updateSellerInput: UpdateSellerInput!) {
		updateSeller(_id: $_id, updateSellerInput: $updateSellerInput) {
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

export const useUpdateSeller = () => {
	return useMutation<SellerUpdated, any>(UPDATE_SELLER);
};
