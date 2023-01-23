import { gql } from "@apollo/client";

export const UPDATE_SELLER_STATUT = gql`
	mutation updateSeller($_id: String!, $updateSellerInput: UpdateSellerInput!) {
		updateSeller(_id: $_id, updateSellerInput: $updateSellerInput) {
			_id
			firstName
			email
		}
	}
`;

export const UPDATE_USER_STATUT = gql`
	mutation updateUser($_id: String!, $updateUserInput: UpdateUserInput!) {
		updateUser(_id: $_id, updateUserInput: $updateUserInput) {
			_id
			firstName
			email
		}
	}
`;

export const UPDATE_BUYER_STATUT = gql`
	mutation updateBuyer($_id: String!, $updateBuyerInput: UpdateBuyerInput!) {
		updateBuyer(_id: $_id, updateBuyerInput: $updateBuyerInput) {
			_id
			firstName
			email
		}
	}
`;
