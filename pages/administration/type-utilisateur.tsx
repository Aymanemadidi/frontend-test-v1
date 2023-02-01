import { useContext, useEffect, useState } from "react";
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
	Modal,
	Button,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
// import client from "../apollo-client";
// import SellersBar from "../components/SellersBar";
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
import TypesBar from "../../components/TypesBar";
import { OpenedContext } from "../../components/Layout";

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
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
	const [reverseSortDirection, setReverseSortDirection] = useState(false);
	const [statut, setStatut] = useState("");
	const [rangeValue, setRangeValue] = useState<DateRangePickerValue>([
		null,
		null,
	]);
	const isOpened = useContext(OpenedContext);
	const [changedByBulkIds, setChangedByBulkIds] = useState<any>([]);
	const [newLibelle, setNewLibelle] = useState("");
	const [openedModal, setOpenedModal] = useState(false);
	const [openedArchiveModal, setOpenedArchiveModal] = useState(false);
	const [openedArchiveAllModal, setOpenedArchiveAllModal] = useState(false);
	const [forBuyer, setForBuyer] = useState(true);
	const [forSeller, setForSeller] = useState(true);

	// const router = useRouter();

	const [list, setList] = useState<any>([]);

	const CREATE_TYPE_USER = gql`
		mutation createTypeUser($createTypeUserInput: CreateTypeUserInput!) {
			createTypeUser(createTypeUserInput: $createTypeUserInput) {
				_id
				libelle
				created_at
				for_buyer
				for_seller
			}
		}
	`;

	const ARCHIVE_TYPE_USER = gql`
		mutation removeTypeUser($_id: String!) {
			removeTypeUser(_id: $_id)
		}
	`;

	const REMOVE_ALL = gql`
		mutation removeAllTypes {
			removeAllTypes
		}
	`;

	const [createTypeUser, statutCreatedType] = useMutation(CREATE_TYPE_USER);
	const [archiveTypeUser, archiveTypeResult] = useMutation(ARCHIVE_TYPE_USER);
	const [removeAllTypeUsers, removeAllResult] = useMutation(REMOVE_ALL);

	const ALL_TYPES = gql`
		query TypeUsers {
			typeUsers {
				_id
				libelle
				created_at
				for_buyer
				for_seller
			}
		}
	`;

	const { error, loading, data } = useQuery(ALL_TYPES, {
		onCompleted: setList,
		fetchPolicy: "no-cache",
	});

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

	let typeUsersData = data?.typeUsers;
	let typeUsers = [];
	// if (results.data) {
	// 	typeUsersData = results.data.typeUsersOcc;
	// }

	const setSorting = (field: keyof RowData) => {
		const reversed = field === sortBy ? !reverseSortDirection : false;
		setReverseSortDirection(reversed);
		setSortBy(field);
		typeUsersData = sortData(typeUsersData, {
			sortBy: field,
			reversed,
			search,
		});
		setList({ typeUsers: typeUsersData });
	};

	const toggleRow = (id: string) =>
		setSelection((current: any) =>
			current.includes(id)
				? current.filter((item: any) => item !== id)
				: [...current, id]
		);
	const toggleAll = () =>
		setSelection((current) =>
			current.length === typeUsersData.length
				? []
				: typeUsersData.map((item: any) => item._id)
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
		typeUsersData = sortData(typeUsersData, {
			sortBy,
			reversed: reverseSortDirection,
			search: value,
		});
		console.log(typeUsersData);
		setList({ typeUsers: typeUsersData });
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

	console.log("typeUsers", list.typeUsers);

	typeUsers = list.typeUsers.map((user: any) => {
		// console.log("isArchived: ", user);
		// if (!user.isArchived) {
		return (
			<TypesBar
				key={user.libelle}
				user={user}
				selection={selection}
				toggleRow={toggleRow}
				statut={statut === "" ? user?.statut : statut}
				ids={changedByBulkIds}
				setList={setList}
				list={list}
			/>
		);
		// }
	});

	function handleActions(e: any) {
		if (e === "archive") {
			return setOpenedArchiveModal(true);
		} else {
			return setOpenedArchiveAllModal(true);
		}
	}

	const removeAll = async (e: any) => {
		e.preventDefault();
		let arr: string[] = [];
		try {
			const typeUserArchived = await removeAllTypeUsers();
			setList({ typeUsers: [] });
			showNotification({
				title: `${"Supression de tout les typeUsers"}`,
				message: `${"Supression de tout les typeUsers avec success"}`,
				color: "green",
				autoClose: 5000,
				bottom: "630px",
			});
			setOpenedArchiveAllModal(false);
		} catch (e: any) {
			showNotification({
				title: "Supression typeUser impossible",
				message: "Une erreur s'est produite",
				color: "red",
				autoClose: 5000,
				bottom: "630px",
			});
		}
	};

	const typeUserArchive = async (e: any) => {
		e.preventDefault();
		let arr: string[] = [];
		try {
			for (let s of selection) {
				const typeUserArchived = await archiveTypeUser({
					variables: {
						_id: s,
					},
				});
				arr.push(s);
			}
			// console.log("typeUserArchived: ", typeUserArchived.data.updatetypeUser._id);
			let test = list.typeUsers.filter(
				(typeUser: any) => !arr.includes(typeUser._id)
			);
			// let filtered = list.typeUsers.filter((m: any) => m._id !== user._id);
			// filtered.push(typeUserArchived.data.updatetypeUser);
			setList({ typeUsers: test });
			showNotification({
				title: `${"Supression typeUser"}`,
				message: `${"Supression typeUser avec success"}`,
				color: "green",
				autoClose: 5000,
				bottom: "630px",
			});
			// setUpdatedLibelle(() => typeUserCreated.data.updatetypeUser.libelle);
			setOpenedArchiveModal(false);
		} catch (e: any) {
			// if (e.message === "libelle unmodified") {
			// 	setErr({ type: 1 });
			// }
			// if (e.message === "Cette typeUser existe déjà") {
			// 	setErr({ type: 2 });
			// }
			// setNewLibelle("");
			// alert(e);
			showNotification({
				title: "Supression typeUser impossible",
				message: "Une erreur s'est produite",
				color: "red",
				autoClose: 5000,
				bottom: "630px",
			});
		}
	};

	const typeUserCreate = async (e: any) => {
		e.preventDefault();
		console.log("From new way: ", newLibelle);
		try {
			const typeUserCreated = await createTypeUser({
				variables: {
					createTypeUserInput: {
						libelle: newLibelle,
						for_buyer: forBuyer,
						for_seller: forSeller,
						description: "",
					},
				},
			});
			console.log("typeUserCreated: ", typeUserCreated);
			setNewLibelle("");
			setList({
				typeUsers: [...list.typeUsers, typeUserCreated.data.createTypeUser],
			});
			showNotification({
				title: `${"Creation typeUser"}`,
				message: `${"Creation typeUser avec success"}`,
				color: "green",
				autoClose: 5000,
				bottom: "630px",
			});
			setOpenedModal(false);
		} catch (e) {
			setNewLibelle("");
			alert(e);
			showNotification({
				title: "Creation typeUser impossible",
				message: "Une erreur s'est produite",
				color: "red",
				autoClose: 5000,
				bottom: "630px",
			});
		}
	};

	// console.log("opened: ", opened);

	return (
		<div className={`${isOpened ? "lg:ml-[15%]" : ""} lg:m-auto lg:w-[85%]`}>
			<Modal
				opened={openedArchiveAllModal}
				onClose={() => setOpenedArchiveAllModal(false)}
				// title={`Voulez vous vraimment archiver la typeUser ${user.libelle}?`}
				title={<p>Voulez vous vraiment supprimer ces types d'utilisateur ?</p>}
				className="shadow-xl"
			>
				<div>
					<form onSubmit={(e) => removeAll(e)}>
						{/* <TextInput
							label="Libelle"
							value={newLibelle}
							onChange={(e) => {
								setErr({ type: 0 });
								setNewLibelle(e.target.value);
							}}
						/> */}
						<div className="flex gap-3 mt-3 justify-end w-full">
							<button
								className="bg-gray-500 rounded-md px-3 py-2 text-white"
								onClick={() => setOpenedArchiveAllModal(false)}
								type="button"
							>
								Abondonner
							</button>
							<button
								type="submit"
								className="bg-green-500 rounded-md px-3 py-2 text-white"
							>
								Confirmer
							</button>
						</div>
					</form>
				</div>
			</Modal>
			<Modal
				opened={openedArchiveModal}
				onClose={() => setOpenedArchiveModal(false)}
				// title={`Voulez vous vraimment archiver la typeUser ${user.libelle}?`}
				title={<p>Voulez vous vraiment supprimer ces types d'utilisateur ?</p>}
				className="shadow-xl"
			>
				<div>
					<form onSubmit={(e) => typeUserArchive(e)}>
						{/* <TextInput
							label="Libelle"
							value={newLibelle}
							onChange={(e) => {
								setErr({ type: 0 });
								setNewLibelle(e.target.value);
							}}
						/> */}
						<div className="flex gap-3 mt-3 justify-end w-full">
							<button
								className="bg-gray-500 rounded-md px-3 py-2 text-white"
								onClick={() => setOpenedArchiveModal(false)}
								type="button"
							>
								Abondonner
							</button>
							<button
								type="submit"
								className="bg-green-500 rounded-md px-3 py-2 text-white"
							>
								Confirmer
							</button>
						</div>
					</form>
				</div>
			</Modal>
			<Modal
				opened={openedModal}
				onClose={() => setOpenedModal(false)}
				title="Ajouter une Type d'utilisateur"
			>
				<form onSubmit={(e) => typeUserCreate(e)}>
					<TextInput
						label="Libelle"
						onChange={(e) => setNewLibelle(e.target.value)}
					/>
					<div className="mt-1">
						<Checkbox
							checked={forSeller}
							onChange={() => setForSeller(!forSeller)}
							label={"Pour vendeur"}
						/>
						<Checkbox
							checked={forBuyer}
							onChange={() => setForBuyer(!forBuyer)}
							label={"Pour Acheteur"}
						/>
					</div>

					<div className="flex gap-3 mt-3 justify-end w-full">
						<button
							className="bg-gray-500 rounded-md px-3 py-2 text-white"
							onClick={() => setOpenedModal(false)}
							type="button"
						>
							Abondonner
						</button>
						<button
							type="submit"
							className="bg-green-500 rounded-md px-3 py-2 text-white"
						>
							Ajouter
						</button>
					</div>
				</form>
			</Modal>
			{/* <div className="lg:w-[85%] lg:m-auto"> */}
			<div className="flex gap-3">
				<p className="text-2xl mb-3 font-semibold">Types d'utilisateurs</p>
				{/* <button onClick={openCreatetypeUserModal}> */}
				<button onClick={() => setOpenedModal(true)}>
					<IconCirclePlus size={35} />
				</button>
			</div>
			<div className="flex gap-1 lg:justify-between mt-3">
				<Select
					classNames={{
						input:
							"rounded-2xl placeholder:font-bold border-green-600 border-2 shadow-xl",
					}}
					// disabled={selection.length === 0}
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
						handleActions(e); // this actually works just need to update the ui
					}}
					data={[
						{
							value: "archive",
							label: "Supprimer la selection",
							disabled: selection.length === 0,
						},
						{ value: "archiveAll", label: "Supprimer Tout" },
					]}
				/>
				<TextInput
					placeholder="Recherche"
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

			<div className="bg-white shadow-sm rounded-xl px-4 py-4">
				<Table>
					<thead>
						<tr className="">
							<th style={{ width: 40 }}>
								<Checkbox
									onChange={toggleAll}
									// checked={selection.length === typeUsersData.length}
									indeterminate={
										false
										// selection.length > 0 &&
										// selection.length !== typeUsersData.length
									}
									transitionDuration={0}
								/>
							</th>
							<th className="hidden lg:table-cell">ID</th>
							<th className="hidden lg:table-cell">Libelle</th>
							<th className="hidden lg:table-cell"></th>
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
							{/* <Th
									sorted={sortBy === "email"}
									reversed={reverseSortDirection}
									onSort={() => setSorting("email")}
									tailwind={"hidden lg:table-cell"}
									// tailwind={"hidden md:table-cell"}
								>
									E-mail
								</Th> */}
							{/* lg:table-cell */}
							{/* <th className="hidden lg:table-cell">Type</th> */}
							{/* <th className="hidden lg:table-cell ">Type du compte</th>
								<th className="hidden lg:table-cell">Verifié</th>*/}
							<th className="hidden lg:table-cell ">Enregistré le</th>
							{/* <th className=" ">Statut</th> */}
							<th>Actions</th>
						</tr>
					</thead>
					<tbody className="">
						{typeUsers.length === 0 ? (
							<div className="ml-[25%]">
								<div>Aucun résultat trouvé !</div>
							</div>
						) : (
							typeUsers.reverse()
						)}
					</tbody>
				</Table>
			</div>
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
