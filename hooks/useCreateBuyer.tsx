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
	prenom: string;
	nom: string;
	email: string;
	password: string;
	pseudo: string;
	countryOfResidence: string;
}

interface Tokens {
	access_token: string;
	refresh_token: string;
}

const CREATE_BUYER = gql`
	mutation createBuyer($createBuyerInput: CreateBuyerInput!) {
		createBuyer(createBuyerInput: $createBuyerInput) {
			access_token
			refresh_token
		}
	}
`;

export const useCreateBuyer = () => {
	return useMutation<Tokens, any>(CREATE_BUYER);
};
