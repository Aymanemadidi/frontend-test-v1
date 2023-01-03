import { useState } from "react";
import {
	createStyles,
	Table,
	Checkbox,
	ScrollArea,
	Group,
	Avatar,
	Text,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
	rowSelected: {
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
				: theme.colors[theme.primaryColor][0],
	},
}));

interface TableSelectionProps {
	data: {
		avatar: string;
		name: string;
		email: string;
		job: string;
		id: string;
	}[];
}

export default function TableSelection({ data }: TableSelectionProps) {
	const { classes, cx } = useStyles();
	const [selection, setSelection] = useState(["1"]);
	const toggleRow = (id: string) =>
		setSelection((current) =>
			current.includes(id)
				? current.filter((item) => item !== id)
				: [...current, id]
		);
	const toggleAll = () =>
		setSelection((current) =>
			current.length === data.length ? [] : data.map((item) => item.id)
		);

	const rows = data.map((item) => {
		const selected = selection.includes(item.id);
		return (
			<tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
				<td>
					<Checkbox
						checked={selection.includes(item.id)}
						onChange={() => toggleRow(item.id)}
						transitionDuration={0}
					/>
				</td>
				<td>
					<Group spacing="sm">
						<Avatar size={26} src={item.avatar} radius={26} />
						<Text size="sm" weight={500}>
							{item.name}
						</Text>
					</Group>
				</td>
				<td>{item.email}</td>
				<td>{item.job}</td>
			</tr>
		);
	});

	return (
		<div className="w-3/4 m-auto">
			<ScrollArea>
				<Table sx={{ minWidth: 800 }} verticalSpacing="sm">
					<thead>
						<tr>
							<th style={{ width: 40 }}>
								<Checkbox
									onChange={toggleAll}
									checked={selection.length === data.length}
									indeterminate={
										selection.length > 0 && selection.length !== data.length
									}
									transitionDuration={0}
								/>
							</th>
							<th>User</th>
							<th>Email</th>
							<th>Job</th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</Table>
			</ScrollArea>
		</div>
	);
}

export async function getStaticProps() {
	return {
		props: {
			data: [
				{
					id: "1",
					avatar:
						"https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
					name: "Robert Wolfkisser",
					job: "Engineer",
					email: "rob_wolf@gmail.com",
				},
				{
					id: "2",
					avatar:
						"https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
					name: "Jill Jailbreaker",
					job: "Engineer",
					email: "jj@breaker.com",
				},
				{
					id: "3",
					avatar:
						"https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
					name: "Henry Silkeater",
					job: "Designer",
					email: "henry@silkeater.io",
				},
				{
					id: "4",
					avatar:
						"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
					name: "Bill Horsefighter",
					job: "Designer",
					email: "bhorsefighter@gmail.com",
				},
				{
					id: "5",
					avatar:
						"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
					name: "Jeremy Footviewer",
					job: "Manager",
					email: "jeremy@foot.dev",
				},
			],
		},
	};
}
