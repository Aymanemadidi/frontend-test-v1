import { gql, useMutation } from "@apollo/client";

export interface CreateUserInput {
	numPortable: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

// interface Tokens {
// 	access_token: string;
// 	refresh_token: string;
// }

const CREATE_ADMIN = gql`
	mutation createUser($createUserInput: CreateUserInput!) {
		createUser(createUserInput: $createUserInput) {
			_id
		}
	}
`;

export const useCreateUser = () => {
	return useMutation<any, any>(CREATE_ADMIN);
};
