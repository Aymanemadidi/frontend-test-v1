import { gql, useMutation } from "@apollo/client";

export interface CreateSellerInput {
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
	firstName: string;
	lastName: string;
	email: string;
	pseudo: string;
	password: string;
	adress: string;
	numberOfEmployees: string;
	companyAdresse: string;
	civilite: string;
	tvaIntra: string;
	typeCompte: string;
	countryOfResidence: string;
}

interface Tokens {
	access_token: string;
	refresh_token: string;
}

const CREATE_SELLER = gql`
	mutation createSeller($createSellerInput: CreateSellerInput!) {
		createSeller(createSellerInput: $createSellerInput) {
			userId
			email
		}
	}
`;

export const useCreateSeller = () => {
	return useMutation<Tokens, any>(CREATE_SELLER);
};
