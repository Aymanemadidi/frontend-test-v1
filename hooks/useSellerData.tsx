import { gql, useQuery } from "@apollo/client";
// import React from "react";

const GET_SELLERS = gql`
	query Sellers {
		sellers {
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

export function useSellers() {
	const { data } = useQuery(GET_SELLERS);
	return data;
}
