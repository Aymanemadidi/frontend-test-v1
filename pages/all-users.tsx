import { useEffect, useState } from "react";
import Link from "next/link";
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
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
// import client from "../apollo-client";
// import SellersBar from "../components/SellersBar";
import BuyersBar from "../components/BuyersBar";
// import { useSellers } from "../hooks/useSellerData";
import {
	IconSelector,
	IconChevronDown,
	IconChevronUp,
	IconSearch,
	IconCirclePlus,
} from "@tabler/icons";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
// import { useRouter } from "next/router";
import dayjs from "dayjs";
import { showNotification } from "@mantine/notifications";
import { openConfirmModal } from "@mantine/modals";
import UsersBar from "../components/UsersBar";

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

export default function Demo({ opened }: any) {
	const [selection, setSelection] = useState([]);
	const [roldeSelection, setRoleSelection] = useState([]);
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
	const [reverseSortDirection, setReverseSortDirection] = useState(false);
	const [emailToSearch, setEmailToSearch] = useState("");
	const [nomEntrepriseToSearch, setNomEntrepriseToSearch] = useState("");
	const [pseudoToSearch, setPseudoToSearch] = useState("");
	// const [startDateToSearch, setStartDateToSearch] = useState("");
	// const [endDateToSearch, setEndDateToSearch] = useState("");
	const [statut, setStatut] = useState("");
	const [rangeValue, setRangeValue] = useState<DateRangePickerValue>([
		null,
		null,
	]);
	const [isOpened, setIsOpened] = useState(opened);
	const [changedByBulkIds, setChangedByBulkIds] = useState<any>([]);
	// const router = useRouter();

	const [list, setList] = useState<any>([]);

	useEffect(() => {
		setIsOpened(opened);
	}, [opened]);

	const UPDATE_SELLER_STATUT = gql`
		mutation updateSeller(
			$_id: String!
			$updateSellerInput: UpdateSellerInput!
		) {
			updateSeller(_id: $_id, updateSellerInput: $updateSellerInput) {
				_id
				firstName
				email
			}
		}
	`;

	const [updateSellerStatut, sellerStatutUpdateResult] =
		useMutation(UPDATE_SELLER_STATUT);

	const UPDATE_STATUT = gql`
		mutation updateBuyer($_id: String!, $updateBuyerInput: UpdateBuyerInput!) {
			updateBuyer(_id: $_id, updateBuyerInput: $updateBuyerInput) {
				_id
				firstName
				email
			}
		}
	`;

	const [updateStatut, statutUpdateResult] = useMutation(UPDATE_STATUT);

	const openModal = (e: any) => {
		return openConfirmModal({
			className: "mt-[200px]",
			confirmProps: {
				className: "bg-green-500 hover:bg-green-600 rounded-2xl",
			},
			cancelProps: {
				className: "rounded-2xl",
			},
			title: "Veuillez confirmer le changement de statut",
			children: (
				<p>
					{e === "actif" ? (
						<p>
							Voulez vous rendre ces utilisateurs{" "}
							<span className="text-green-500">Actif</span> ?
						</p>
					) : e === "inactif" ? (
						<p>
							Voulez vous rendre ces utilisateurs{" "}
							<span className="text-red-400">Inactif</span> ?
						</p>
					) : (
						<p>
							Voulez vous rendre ces utilisateurs{" "}
							<span className="text-red-400">Archivé</span> ?
						</p>
					)}
				</p>
			),
			labels: { confirm: "Confirmer", cancel: "Abandonner" },
			onCancel: () => {
				setStatut(statut);
			},
			onConfirm: async () => {
				try {
					let s: any;
					let test: any;
					let arr: number[] = [];
					if (e === "actif" || e === "inactif") {
						for (s of selection) {
							if (s[1] === "Buyer") {
								await updateStatut({
									variables: {
										_id: s[0],
										updateBuyerInput: {
											statut: e,
										},
									},
								});
							} else if (s[1] === "Seller") {
								await updateSellerStatut({
									variables: {
										_id: s[0],
										updateSellerInput: {
											statut: e,
										},
									},
								});
							}
						}
					} else {
						for (s of selection) {
							if (s[1] === "Buyer") {
								await updateStatut({
									variables: {
										_id: s[0],
										updateBuyerInput: {
											isArchived: true,
										},
									},
								});
							} else if (s[1] === "Seller") {
								await updateSellerStatut({
									variables: {
										_id: s[0],
										updateSellerInput: {
											isArchived: true,
										},
									},
								});
							}
							arr.push(s);
							// setList({ sellers: test });
						}
						// console.log("arr: ", arr);
						test = list.users2.filter(
							(user2: any) =>
								!arr.some((element: any) => element.includes(user2._id))
						);

						console.log("test: ", test);

						setList({ users2: test });
						// setList({ sellers: test });
					}
					setChangedByBulkIds(selection);
					console.log("e", e);
					if (e !== "archive") setStatut(e);
					setSelection([]);
					showNotification({
						title: `${
							e !== "archive" ? "Changement de multiple statut" : "Archivage"
						}`,
						message: `${
							e !== "archive"
								? "Statuts changé avec success"
								: "Archivage fait avec success"
						}`,
						color: "green",
						autoClose: 5000,
						bottom: "630px",
						// top: "0px",
						// classNames: {
						// 	root: "translate-y-[-500px]",
						// },
					});
				} catch (e) {
					alert(e);
					showNotification({
						title: "Changement de statut impossible",
						message: "Une erreur s'est produite",
						color: "red",
						autoClose: 5000,
						bottom: "630px",
					});
				}
			},
		});
	};

	const ALL_USERS_NEW = gql`
		query users2 {
			users2 {
				_id
				firstName
				lastName
				email
				role
				seller {
					statut
					created_at
					typeCompte
					nomEntreprise
					pseudo
					typeCompte
					statut_moderation
					isArchived
				}
				buyer {
					statut
					created_at
					nomEntreprise
					pseudo
					typeCompte
					isArchived
				}
			}
		}
	`;

	// const ALL_USERS = gql`
	// 	query users {
	// 		users {
	// 			_id
	// 			email
	// 			role
	// 		}
	// 	}
	// `;

	const GET_USERS_BY_OC = gql`
		query UsersByOc(
			$email: String!
			$nomEntreprise: String!
			$pseudo: String!
			$startDate: String!
			$endDate: String!
		) {
			usersOcc(
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
				typeCompte
				created_at
				statut
				pseudo
				isArchived
			}
		}
	`;

	// const newData = useQuery(ALL_USERS_NEW, {
	// 	fetchPolicy: "no-cache",
	// });
	// if (newData.data) {
	// 	console.log("newData: ", newData.data);
	// }

	const { error, loading, data } = useQuery(ALL_USERS_NEW, {
		onCompleted: setList,
		fetchPolicy: "no-cache",
	});
	const [getEmailsBySearch, results] = useLazyQuery(GET_USERS_BY_OC);

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
	}

	console.log("newUsers: ", data);

	let usersData = data?.users2;
	let users = [];
	if (results.data) {
		usersData = results.data.usersOcc;
	}

	const setSorting = (field: keyof RowData) => {
		const reversed = field === sortBy ? !reverseSortDirection : false;
		setReverseSortDirection(reversed);
		setSortBy(field);
		usersData = sortData(usersData, { sortBy: field, reversed, search });
		setList({ users2: usersData });
	};

	const toggleRow = (arr: [id: string, role: string]) => {
		setSelection((current: any) => {
			console.log("current selection: ", current);
			return current.some((s: any) => s.includes(arr[0]))
				? current.filter((item: any) => item[0] !== arr[0])
				: [...current, [arr[0], arr[1]]];
		});
	};
	const toggleAll = () =>
		setSelection((current) =>
			current.length === usersData.length
				? []
				: usersData.map((item: any) => item._id)
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
		usersData = sortData(usersData, {
			sortBy,
			reversed: reverseSortDirection,
			search: value,
		});
		console.log(usersData);
		setList({ users2: usersData });
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
		if (range[0] !== null && range[1] !== null) {
			let y = range[0]?.getFullYear();
			let m = range[0]?.getMonth();
			let d = range[0]?.getDate();
			// if (m) {
			const start = `${y}/${m + 1}/${d}`;
			results[0] = start;
			// }
			y = range[1]?.getFullYear();
			m = range[1]?.getMonth();
			d = range[1]?.getDate();
			// if (m) {
			const end = `${y}/${m + 1}/${d + 1}`;
			results[1] = end;
			// }
		}
		console.log("results: ", results);
		return results;
	}

	console.log("users", list.users);

	users = list.users2.map((user: any) => {
		console.log("isArchived: ", user);
		if (
			user.seller
				? !user.seller.isArchived
				: user.buyer
				? !user.buyer.isArchived
				: !user.isArchived
		) {
			return (
				<UsersBar
					key={user.email}
					user={user}
					selection={selection}
					toggleRow={toggleRow}
					statut={statut === "" ? user.statut : statut}
					ids={changedByBulkIds}
					setList={setList}
					list={list}
				/>
			);
		}
	});

	// console.log("opened: ", opened);

	return (
		<div className={`${isOpened ? "lg:ml-[15%]" : ""} lg:m-auto lg:w-[85%]`}>
			{/* <div className="lg:w-[85%] lg:m-auto"> */}
			<div className="flex gap-3">
				<p className="text-2xl mb-3 font-semibold">Tous les utilisateurs</p>
				<Link href={"/ajouter-acheteur"}>
					<IconCirclePlus size={35} />
				</Link>
			</div>
			<form className="">
				<div className="flex flex-col px-5 pt-5 py-2 bg-white rounded-2xl shadow-sm mb-2">
					<div className="flex gap-2">
						<TextInput
							classNames={{
								// input: "w-[250px] rounded-2xl",
								input: " rounded-2xl lg:w-[250px]",
							}}
							placeholder="E-mail"
							// placeholder="Search by E-mail"
							mb="md"
							icon={<IconSearch size={14} stroke={1.5} />}
							value={emailToSearch}
							autoComplete="off"
							onChange={(e) => setEmailToSearch(e.currentTarget.value)}
						/>
						<TextInput
							classNames={{
								input: " rounded-2xl lg:w-[280px]",
								// input: "w-[280px] rounded-2xl",
							}}
							// placeholder="Search by nom de société"
							placeholder="Société"
							mb="md"
							icon={<IconSearch size={14} stroke={1.5} />}
							value={nomEntrepriseToSearch}
							autoComplete="off"
							onChange={(e) => setNomEntrepriseToSearch(e.currentTarget.value)}
						/>
					</div>
					<div className="flex flex-col lg:flex-row lg:justify-between items-start">
						<div className="flex gap-2">
							<TextInput
								classNames={{
									// input: "w-[250px] rounded-2xl",
									root: "basis-3/5",
									input: "rounded-2xl lg:w-[250px]",
								}}
								// placeholder="Search by pseudo"
								placeholder="Pseudo"
								mb="md"
								icon={<IconSearch size={14} stroke={1.5} />}
								value={pseudoToSearch}
								onChange={(e) => setPseudoToSearch(e.currentTarget.value)}
							/>
							<DateRangePicker
								// label="Book hotel"
								classNames={{
									// input: "w-[350px] rounded-2xl",
									root: "w-full",
									input: "rounded-2xl lg:w-[350px]",
								}}
								placeholder="Dates"
								// placeholder="Pick dates range"
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
								console.log("rangeValue:", rangeValue);
								let ranges = getStartAndEndFromRange(rangeValue);
								console.log("ranges", ranges);
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
								setList({ buyers: datax.data.buyersOcc });
							}}
						>
							Rechercher
						</button>
					</div>
				</div>
			</form>
			<div className="flex gap-1 lg:justify-between mt-3">
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
					onChange={(e) => {
						openModal(e); // this actually works just need to update the ui
					}}
					data={[
						{ value: "archive", label: "Archiver" },
						{ value: "actif", label: "activer" },
						{ value: "inactif", label: "desactiver" },
					]}
				/>
				<TextInput
					placeholder="Search by any field"
					classNames={{
						input: "rounded-2xl w-[200px] lg:w-[250px]",
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
										checked={selection.length === usersData.length}
										indeterminate={
											false
											// selection.length > 0 &&
											// selection.length !== usersData.length
										}
										transitionDuration={0}
									/>
								</th>
								<th className="hidden lg:table-cell">ID</th>
								<th className="">Société</th>
								<th className="hidden lg:table-cell">Pseudo</th>
								{/* <Th
									sorted={sortBy === "nomEntreprise"}
									reversed={reverseSortDirection}
									onSort={() => setSorting("nomEntreprise")}
									tailwind={"hidden lg:table-cell"}
								>
									<p className="">Société</p>
								</Th> */}
								{/* <Th
									sorted={sortBy === "pseudo"}
									reversed={reverseSortDirection}
									onSort={() => setSorting("pseudo")}
									// tailwind={"hidden md:table-cell"}
									tailwind={"hidden lg:table-cell"}
								>
									Pseudo
								</Th> */}
								<Th
									sorted={sortBy === "email"}
									reversed={reverseSortDirection}
									onSort={() => setSorting("email")}
									tailwind={"hidden lg:table-cell"}
									// tailwind={"hidden md:table-cell"}
								>
									E-mail
								</Th>
								{/* lg:table-cell */}
								<th className="hidden lg:table-cell">Type</th>
								<th className="hidden lg:table-cell ">Type du compte</th>
								{/*<th className="hidden lg:table-cell">Verifié</th>*/}
								<th className="hidden lg:table-cell ">Enregistré le</th>
								<th className="">Statut</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody className="">
							{users.length === 0 ? (
								<div className="ml-[25%]">
									<div>No results found</div>
								</div>
							) : (
								users.reverse()
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
