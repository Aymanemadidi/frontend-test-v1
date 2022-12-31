import { gql, useMutation } from "@apollo/client";

export interface LoginUserInput {
	email: string;
	password: string;
}

interface Tokens {
	access_token: string;
	refresh_token: string;
}

const LOGIN = gql`
	mutation loginUser($loginUserInput: LoginUserInput!) {
		loginUser(loginUserInput: $loginUserInput) {
			access_token
			refresh_token
		}
	}
`;

export const useLoginUser = () => {
	return useMutation<Tokens, any>(LOGIN);
};
