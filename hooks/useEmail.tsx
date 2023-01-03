import { gql, useQuery } from "@apollo/client";

export interface SearchByEmailInput {
	email: string;
}

interface RowData {
	nomEntreprise: string;
	email: string;
	numeroSiret: string;
	statut_moderation: string;
	typeVendeur: string;
	typeCompte: string;
	created_at: string;
	statut: string;
	pseudo: string;
}

const EMAIL = gql`
	query {
		sellersOcc(str: $str) {
			_id
			email
			nomEntreprise
			numeroSiret
			statut_moderation
			typeVendeur
			typeCompte
			created_at
			statut
			pseudo
		}
	}
`;

export const useEmail = () => {
	return useQuery<RowData, any>(EMAIL);
};
