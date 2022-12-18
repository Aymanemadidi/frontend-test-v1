import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
	query Users {
		users {
			_id
			email
			role
		}
	}
`;

export default function Users() {
	const { data, loading, error } = useQuery(QUERY);

	if (loading) {
		return <h2>Loading...</h2>;
	}

	if (error) {
		console.error(error);
		return null;
	}

	const users = data.users;

	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			{users.map((user: any) => {
				return (
					<div key={user.email} className="flex gap-2 flex-col">
						<div>{user.email}</div>
						<div>{user._id}</div>
						<div>{user.role}</div>
						<hr />
					</div>
				);
			})}
		</div>
	);
}
