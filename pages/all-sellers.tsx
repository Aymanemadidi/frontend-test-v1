import { useEffect, useState } from "react";
import {
	Table,
	Checkbox,
	createStyles,
	UnstyledButton,
	Group,
	Text,
	Center,
	Select,
	TextInput,
	LoadingOverlay,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import client from "../apollo-client";
import SellersBar from "../components/SellersBar";
import { useSellers } from "../hooks/useSellerData";
import {
	IconSelector,
	IconChevronDown,
	IconChevronUp,
	IconSearch,
} from "@tabler/icons";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import { Router } from "tabler-icons-react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
	th: {
		padding: "0 !important",
	},

	control: {
		width: "100%",
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
	},

	icon: {
		width: 21,
		height: 21,
		borderRadius: 21,
	},
}));

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

interface TableSortProps {
	data: RowData[];
}

interface ThProps {
	children: React.ReactNode;
	reversed: boolean;
	sorted: boolean;
	onSort(): void;
	tailwind: string;
}

function Th({ children, reversed, sorted, onSort, tailwind = "" }: ThProps) {
	const { classes } = useStyles();
	const Icon = sorted
		? reversed
			? IconChevronUp
			: IconChevronDown
		: IconSelector;
	return (
		<th className={`${classes.th} ${tailwind}`}>
			<UnstyledButton onClick={onSort} className={classes.control}>
				<Group position="apart">
					<Text weight={500} size="sm">
						{children}
					</Text>
					<Center className={classes.icon}>
						<Icon size={14} stroke={1.5} />
					</Center>
				</Group>
			</UnstyledButton>
		</th>
	);
}

export default function Demo() {
	const [selection, setSelection] = useState([]);
	const [search, setSearch] = useState("");
	// const [sortedData, setSortedData] = useState<any>([]);
	const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
	const [reverseSortDirection, setReverseSortDirection] = useState(false);
	const [emailToSearch, setEmailToSearch] = useState("");
	const [nomEntrepriseToSearch, setNomEntrepriseToSearch] = useState("");
	const [pseudoToSearch, setPseudoToSearch] = useState("");
	const [startDateToSearch, setStartDateToSearch] = useState("");
	const [endDateToSearch, setEndDateToSearch] = useState("");
	const [rangeValue, setRangeValue] = useState<DateRangePickerValue>([
		null,
		null,
	]);
	const router = useRouter();

	const [list, setList] = useState<any>([]);

	const ALL_SELLERS = gql`
		query Sellers {
			sellers {
				_id
				userId
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

	const GET_SELLERS_BY_OC = gql`
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
				typeVendeur
				typeCompte
				created_at
				statut
				pseudo
			}
		}
	`;

	const { error, loading, data } = useQuery(ALL_SELLERS, {
		onCompleted: setList,
		fetchPolicy: "no-cache",
	});
	const [getEmailsBySearch, results] = useLazyQuery(GET_SELLERS_BY_OC);

	if (loading) {
		return (
			<div className="flex justify-center">
				<LoadingOverlay visible />;
			</div>
		);
	}

	if (error) {
		// router.push("/login");

		return <div>{error.message}</div>;
		// return (
		// 	<div className="flex justify-center">
		// 		<div>{error.message}</div>;
		// 	</div>
		// );
	}

	let sellersData = data?.sellers;
	let sellers = [];
	if (results.data) {
		sellersData = results.data.sellersOcc;
	}

	const setSorting = (field: keyof RowData) => {
		const reversed = field === sortBy ? !reverseSortDirection : false;
		setReverseSortDirection(reversed);
		setSortBy(field);
		sellersData = sortData(sellersData, { sortBy: field, reversed, search });
		setList({ sellers: sellersData });
	};

	const toggleRow = (id: string) =>
		setSelection((current: any) =>
			current.includes(id)
				? current.filter((item: any) => item !== id)
				: [...current, id]
		);
	const toggleAll = () =>
		setSelection((current) =>
			current.length === sellersData.length
				? []
				: sellersData.map((item: any) => item._id)
		);

	function filterData(data: RowData[], search: string) {
		const query = search.toLowerCase().trim();
		// console.log(data);
		return data.filter((item) =>
			keys(data[0]).some((key) => {
				if (typeof item[key] === "string") {
					return item[key].toLowerCase().includes(query);
				} else if (typeof item[key] === "number") {
					return item[key].toString().toLowerCase().includes(query);
				}
			})
		);
	}

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;
		setSearch(value);
		sellersData = sortData(sellersData, {
			sortBy,
			reversed: reverseSortDirection,
			search: value,
		});
		console.log(sellersData);
		setList({ sellers: sellersData });
	};

	function sortData(
		data: RowData[],
		payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
	) {
		const { sortBy } = payload;

		if (!sortBy) {
			return filterData(data, payload.search);
		}

		return filterData(
			[...data].sort((a, b) => {
				if (payload.reversed) {
					return b[sortBy].localeCompare(a[sortBy]);
				}

				return a[sortBy].localeCompare(b[sortBy]);
			}),
			payload.search
		);
	}

	function getStartAndEndFromRange(range: any) {
		let results = ["", ""];
		if (range) {
			let y = range[0]?.getFullYear();
			let m = range[0]?.getMonth();
			let d = range[0]?.getDate();
			if (m) {
				const start = `${y}/${m + 1}/${d}`;
				results[0] = start;
			}
			y = range[1]?.getFullYear();
			m = range[1]?.getMonth();
			d = range[1]?.getDate();
			if (m) {
				const end = `${y}/${m + 1}/${d + 1}`;
				results[1] = end;
			}
		}
		console.log("results: ", results);
		return results;
	}

	// console.log("list: ", list.sellers.reverse());
	sellers = list.sellers.map((user: any) => (
		<SellersBar
			key={user.email}
			user={user}
			selection={selection}
			toggleRow={toggleRow}
		/>
	));

	return (
		<div className="w-[85%] m-auto">
			<form>
				<div className="flex flex-col px-5 pt-5 py-2 bg-white rounded-2xl shadow-sm mb-2">
					<div className="flex gap-2">
						<TextInput
							classNames={{
								input: "w-[250px] rounded-2xl",
							}}
							placeholder="Search by E-mail"
							mb="md"
							icon={<IconSearch size={14} stroke={1.5} />}
							value={emailToSearch}
							autoComplete="off"
							onChange={(e) => setEmailToSearch(e.currentTarget.value)}
						/>
						<TextInput
							classNames={{
								input: "w-[280px] rounded-2xl",
							}}
							placeholder="Search by nom de société"
							mb="md"
							icon={<IconSearch size={14} stroke={1.5} />}
							value={nomEntrepriseToSearch}
							autoComplete="off"
							onChange={(e) => setNomEntrepriseToSearch(e.currentTarget.value)}
						/>
					</div>
					<div className="flex justify-between items-start">
						<div className="flex gap-2">
							<TextInput
								classNames={{
									input: "w-[250px] rounded-2xl",
								}}
								placeholder="Search by pseudo"
								mb="md"
								icon={<IconSearch size={14} stroke={1.5} />}
								value={pseudoToSearch}
								onChange={(e) => setPseudoToSearch(e.currentTarget.value)}
							/>
							<DateRangePicker
								// label="Book hotel"
								classNames={{
									input: "w-[350px] rounded-2xl",
								}}
								placeholder="Pick dates range"
								value={rangeValue}
								onChange={setRangeValue}
								maxDate={dayjs(new Date()).toDate()}
							/>
						</div>
						<button
							type="submit"
							className="bg-green-600 text-white text-xs hover:bg-green-500 px-[30px] py-3 rounded-2xl"
							onClick={async (e) => {
								e.preventDefault();
								setSearch("");
								// console.log("rangeValue:", rangeValue);
								let ranges = getStartAndEndFromRange(rangeValue);
								const datax = await getEmailsBySearch({
									variables: {
										email: emailToSearch,
										nomEntreprise: nomEntrepriseToSearch,
										pseudo: pseudoToSearch,
										startDate: ranges[0],
										endDate: ranges[1],
									},
								});
								// console.log("ranges: ", ranges[0]);
								// console.log("ranges: ", ranges[1]);
								// console.log(datax.data.sellersOcc);
								// setSortedData(datax.data.sellersOcc);
								// console.log("search by dates data: ", datax.data.sellersOcc);
								setList({ sellers: datax.data.sellersOcc });
							}}
						>
							Rechercher
						</button>
					</div>
				</div>
			</form>
			<div className="flex justify-between mt-3">
				<Select
					classNames={{
						input:
							"rounded-2xl placeholder:font-bold border-green-600 border-2 shadow-xl",
					}}
					disabled={selection.length === 0}
					rightSection={
						<IconChevronDown
							size={14}
							color={"black"}
							// style={{ marginRight: "10px" }}
						/>
					}
					rightSectionWidth={30}
					placeholder="Actions"
					// defaultValue={user.statut}
					onChange={() => {
						console.log("e");
					}}
					data={[{ value: "Suprimmer", label: "Suprimmer" }]}
				/>
				<TextInput
					placeholder="Search by any field"
					classNames={{
						input: "rounded-2xl w-[250px]",
					}}
					mb="md"
					icon={<IconSearch size={14} stroke={1.5} />}
					value={search}
					onChange={handleSearchChange}
					type="text"
				/>
			</div>
			{results.loading ? (
				<div className="flex justify-center">
					<LoadingOverlay
						visible
						loaderProps={{ size: "xl", color: "green", variant: "bars" }}
					/>
				</div>
			) : (
				<div className="bg-white shadow-sm rounded-xl px-4 py-4">
					<Table>
						<thead>
							<tr className="">
								<th style={{ width: 40 }}>
									<Checkbox
										onChange={toggleAll}
										checked={selection.length === sellersData.length}
										indeterminate={
											false
											// selection.length > 0 &&
											// selection.length !== sellersData.length
										}
										transitionDuration={0}
									/>
								</th>
								<th>ID</th>
								<Th
									sorted={sortBy === "nomEntreprise"}
									reversed={reverseSortDirection}
									onSort={() => setSorting("nomEntreprise")}
									tailwind={""}
								>
									<p className="">Société</p>
								</Th>
								<Th
									sorted={sortBy === "pseudo"}
									reversed={reverseSortDirection}
									onSort={() => setSorting("pseudo")}
									tailwind={"hidden md:table-cell"}
								>
									Pseudo
								</Th>
								<Th
									sorted={sortBy === "email"}
									reversed={reverseSortDirection}
									onSort={() => setSorting("email")}
									tailwind={"hidden md:table-cell"}
								>
									E-mail
								</Th>
								<th className="hidden lg:table-cell">Type</th>
								<th className="hidden lg:table-cell ">Type du compte</th>
								<th className="hidden lg:table-cell">Verifié</th>
								<th className="hidden lg:table-cell ">enregistré le</th>
								<th className="hidden lg:table-cell ">Statut</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody className="">
							{sellers.length === 0 ? (
								<div className="ml-[25%]">
									<div>No results found</div>
								</div>
							) : (
								sellers.reverse()
							)}
						</tbody>
					</Table>
				</div>
			)}
		</div>
	);
}

// export async function getStaticProps() {
// 	// const results = useSellers();
// 	// console.log("results: ", results);
// 	const { data } = await client.query({
// 		query: gql`
// 			query Sellers {
// 				sellers {
// 					_id
// 					email
// 					nomEntreprise
// 					numeroSiret
// 					statut_moderation
// 					typeVendeur
// 					typeCompte
// 					created_at
// 					statut
// 					pseudo
// 				}
// 			}
// 		`,
// 	});

// 	return {
// 		props: {
// 			users: data.sellers,
// 		},
// 	};
// }
