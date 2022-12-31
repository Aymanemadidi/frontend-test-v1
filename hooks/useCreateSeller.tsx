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
	prenom: string;
	nom: string;
	email: string;
	pseudo: string;
	password: string;
	adress: string;
	countryOfResidence: string;
}

interface Tokens {
	access_token: string;
	refresh_token: string;
}

const CREATE_SELLER = gql`
	mutation createSeller($createSellerInput: CreateSellerInput!) {
		createSeller(createSellerInput: $createSellerInput) {
			access_token
			refresh_token
		}
	}
`;

export const useCreateSeller = () => {
	return useMutation<Tokens, any>(CREATE_SELLER);
};
