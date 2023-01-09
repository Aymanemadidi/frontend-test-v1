import { gql, useMutation } from "@apollo/client";

export interface CreateBuyerInput {
	nomEntreprise: string;
	numeroSiret: string;
	numFixe: string;
	numPortable: string;
	website: string;
	ville: string;
	codePostal: string;
	pays: string;
	dateOfBirth: string;
	nationality: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	pseudo: string;
	countryOfResidency: string;
	adresse: string;
	companyAdresse: string;
	companyVille: string;
	companyCodePostal: string;
	companyPays: string;
	civilite: string;
	departement: string;
	typeCompte: string;
	tvaIntra: string;
}

// interface Tokens {
// 	access_token: string;
// 	refresh_token: string;
// }

const CREATE_BUYER = gql`
	mutation createBuyer($createBuyerInput: CreateBuyerInput!) {
		createBuyer(createBuyerInput: $createBuyerInput) {
			userId
			email
		}
	}
`;

export const useCreateBuyer = () => {
	return useMutation<any, any>(CREATE_BUYER);
};
