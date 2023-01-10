import { gql, useMutation } from "@apollo/client";

export interface UpdateBuyerInput {
	nomEntreprise: string;
	numeroSiret: string;
	groupe: string;
	codePostal: string;
	ville: string;
	departement: string;
	pays: string;
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

const UPDATE_BUYER = gql`
	mutation updateBuyer($_id: String!, $updateBuyerInput: UpdateBuyerInput!) {
		updateBuyer(_id: $_id, updateBuyerInput: $updateBuyerInput) {
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
			companyVille
			companyCodePostal
		}
	}
`;

export const useUpdateBuyer = () => {
	return useMutation<any, any>(UPDATE_BUYER);
};
