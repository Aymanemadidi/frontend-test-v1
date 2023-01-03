import { gql, useMutation } from "@apollo/client";

export interface LoginUserInput {
	email: string;
	password: string;
}

interface LoggedUserOutput {
	_id: string;
}

const LOGIN = gql`
	mutation loginUser($loginUserInput: LoginUserInput!) {
		loginUser(loginUserInput: $loginUserInput) {
			_id
		}
	}
`;

export const useLoginUser = () => {
	return useMutation(LOGIN);
};
