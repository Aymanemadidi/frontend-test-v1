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
	adresse: string;
	numberOfEmployees: string;
	companyAdresse: string;
	companyCodePostal: string;
	companyVille: string;
	companyPays: string;
	civilite: string;
	tvaIntra: string;
	typeCompte: string;
	statutLegal: string;
	countryOfResidency: string;
	refundAdresse: string;
	refundCodePostal: string;
	refundVille: string;
	refundPays: string;
}

interface Tokens {
	access_token: string;
	refresh_token: string;
}

const CREATE_SELLER_BY_ADM = gql`
	mutation createSellerByAdm($createSellerInput: CreateSellerInput!) {
		createSellerByAdm(createSellerInput: $createSellerInput) {
			userId
			email
		}
	}
`;

export const useCreateSellerByAdm = () => {
	return useMutation<any, any>(CREATE_SELLER_BY_ADM);
};
