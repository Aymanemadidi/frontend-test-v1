import { gql } from "@apollo/client";

//-------------------Vendeurs----------------------//

export const ALL_SELLERS = gql`
	query Sellers {
		sellers {
			_id
			userId
			email
			nomEntreprise
			numeroSiret
			statut_moderation
			isPro
			created_at
			statut
			pseudo
			isArchived
			type {
				libelle
			}
		}
	}
`;

export const ALL_SELLERS_PRO = gql`
	query SellersPro {
		sellersPro {
			_id
			userId
			email
			nomEntreprise
			numeroSiret
			statut_moderation
			isPro
			created_at
			statut
			pseudo
			isArchived
			type {
				libelle
			}
		}
	}
`;

export const GET_SELLERS_BY_OC = gql`
	query SellersByOc(
		$email: String!
		$nomEntreprise: String!
		$pseudo: String!
		$startDate: String!
		$endDate: String!
	) {
		sellersOcc(
			email: $email
			nomEntreprise: $nomEntreprise
			pseudo: $pseudo
			startDate: $startDate
			endDate: $endDate
		) {
			_id
			userId
			email
			nomEntreprise
			numeroSiret
			statut_moderation
			isPro
			created_at
			statut
			pseudo
			isArchived
			type {
				libelle
			}
		}
	}
`;

export const GET_SELLERS_BY_OC_PRO = gql`
	query SellersByOc(
		$email: String!
		$nomEntreprise: String!
		$pseudo: String!
		$startDate: String!
		$endDate: String!
		$isPro: Boolean!
	) {
		sellersOcc(
			email: $email
			nomEntreprise: $nomEntreprise
			pseudo: $pseudo
			startDate: $startDate
			endDate: $endDate
			isPro: $isPro
		) {
			_id
			userId
			email
			nomEntreprise
			numeroSiret
			statut_moderation
			isPro
			created_at
			statut
			pseudo
			isArchived
			type {
				libelle
			}
		}
	}
`;

//-------------------Acheteurs----------------------//

export const ALL_BUYERS = gql`
	query Buyers {
		buyers {
			_id
			userId
			email
			nomEntreprise
			numeroSiret
			created_at
			statut
			pseudo
			isArchived
			type {
				libelle
			}
		}
	}
`;

export const GET_BUYERS_BY_OC = gql`
	query BuyersByOc(
		$email: String!
		$nomEntreprise: String!
		$pseudo: String!
		$startDate: String!
		$endDate: String!
	) {
		buyersOcc(
			email: $email
			nomEntreprise: $nomEntreprise
			pseudo: $pseudo
			startDate: $startDate
			endDate: $endDate
		) {
			_id
			userId
			email
			nomEntreprise
			numeroSiret
			created_at
			statut
			pseudo
			isArchived
			type {
				libelle
			}
		}
	}
`;

//-------------------Utilisateurs----------------------//

export const GET_USERS_BY_OC = gql`
	query UsersByOc(
		$email: String!
		$nomEntreprise: String!
		$pseudo: String!
		$startDate: String!
		$endDate: String!
		$statut: String!
		$type: String!
	) {
		usersOcc(
			email: $email
			nomEntreprise: $nomEntreprise
			pseudo: $pseudo
			startDate: $startDate
			endDate: $endDate
			statut: $statut
			type: $type
		) {
			_id
			firstName
			lastName
			email
			role
			statut
			isArchived
			seller {
				statut
				created_at
				nomEntreprise
				pseudo
				isPro
				statut_moderation
				isArchived
				type {
					libelle
				}
			}
			buyer {
				statut
				created_at
				nomEntreprise
				pseudo
				isArchived
				type {
					libelle
				}
			}
		}
	}
`;

export const ALL_USERS_NEW = gql`
	query usersWithAgregation {
		usersWithAgregation {
			_id
			firstName
			lastName
			email
			role
			statut
			isArchived
			seller {
				statut
				created_at
				nomEntreprise
				pseudo
				isPro
				statut_moderation
				isArchived
				type {
					libelle
				}
			}
			buyer {
				statut
				created_at
				nomEntreprise
				pseudo
				isArchived
				type {
					libelle
				}
			}
		}
	}
`;

//-------------------Admins----------------------//

export const ALL_ADMINS = gql`
	query Admins {
		admins {
			_id
			firstName
			lastName
			email
			role
			statut
			created_at
			isArchived
		}
	}
`;

export const GET_ADMINS_BY_OC = gql`
	query AdminsByOc(
		$email: String!
		$startDate: String!
		$endDate: String!
		$statut: String!
	) {
		adminsOcc(
			email: $email
			startDate: $startDate
			endDate: $endDate
			statut: $statut
		) {
			_id
			firstName
			lastName
			email
			created_at
			statut
			isArchived
		}
	}
`;
