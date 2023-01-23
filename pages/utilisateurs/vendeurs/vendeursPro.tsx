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
import "dayjs/locale/fr";
// import client from "../apollo-client";
import SellersBar from "../../../components/SellersBar";
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
import {
	RowData,
	ThProps,
	sortData,
	getStartAndEndFromRange,
} from "../../../utils/filtersUtils";
import { UPDATE_SELLER_STATUT as UPDATE_STATUT } from "../../../graphql/mutations";
import {
	ALL_SELLERS_PRO,
	GET_SELLERS_BY_OC_PRO as GET_SELLERS_BY_OC,
} from "../../../graphql/queries";

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

export function Th({
	children,
	reversed,
	sorted,
	onSort,
	tailwind = "",
}: ThProps) {
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
							await updateStatut({
								variables: {
									_id: s,
									updateSellerInput: {
										statut: e,
									},
								},
							});
						}
					} else {
						for (s of selection) {
							await updateStatut({
								variables: {
									_id: s,
									updateSellerInput: {
										isArchived: true,
									},
								},
							});
							arr.push(s);
							// setList({ sellers: test });
							// console.log("test: ", test);
						}
						// console.log("arr: ", arr);
						test = list.sellersPro.filter(
							(seller: any) => !arr.includes(seller.userId)
						);

						setList({ sellersPro: test });
						// setList({ sellers: test });
					}
					setChangedByBulkIds(selection);
					if (e !== "archive") setStatut(() => e);
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
					showNotification({
						title: "Changement de statut impossible",
						message: "Vendeur non moderer",
						color: "red",
						autoClose: 5000,
						bottom: "630px",
					});
				}
			},
		});
	};

	const { error, loading, data } = useQuery(ALL_SELLERS_PRO, {
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
	}

	let sellersData = data?.sellersPro;
	let sellersPro = [];
	if (results.data) {
		sellersData = results.data.sellersOcc;
	}

	const setSorting = (field: keyof RowData) => {
		const reversed = field === sortBy ? !reverseSortDirection : false;
		setReverseSortDirection(reversed);
		setSortBy(field);
		sellersData = sortData(sellersData, { sortBy: field, reversed, search });
		setList({ sellersPro: sellersData });
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
				: sellersData.map((item: any) => item.userId)
		);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;
		setSearch(value);
		sellersData = sortData(sellersData, {
			sortBy,
			reversed: reverseSortDirection,
			search: value,
		});
		console.log(sellersData);
		setList({ sellersPro: sellersData });
	};

	console.log("sellers", list.sellers);

	sellersPro = list.sellersPro.map((user: any) => {
		console.log("isArchived: ", user);
		if (!user.isArchived) {
			return (
				<SellersBar
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
				<p className="text-2xl mb-3 font-semibold">Vendeurs Pro</p>
				<Link
					href={{
						pathname: "/utilisateurs/vendeurs/ajouter-vendeur",
						query: { isPro: true },
					}}
				>
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
								locale="fr"
								classNames={{
									// input: "w-[350px] rounded-2xl",
									root: "w-full",
									input: "rounded-2xl lg:w-[350px]",
								}}
								placeholder="Date d’enregistrement min - max"
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
										isPro: true,
									},
								});
								// console.log("ranges: ", ranges[0]);
								// console.log("ranges: ", ranges[1]);
								// console.log(datax.data.sellersOcc);
								// setSortedData(datax.data.sellersOcc);
								// console.log("search by dates data: ", datax.data.sellersOcc);
								setList({ sellersPro: datax.data.sellersOcc });
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
						{ value: "inactif", label: "désactiver" },
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
								<th className="hidden lg:table-cell">ID</th>
								<th className="lg:hidden">Société</th>
								<Th
									sorted={sortBy === "nomEntreprise"}
									reversed={reverseSortDirection}
									onSort={() => setSorting("nomEntreprise")}
									tailwind={"hidden lg:table-cell"}
								>
									<p className="">Société</p>
								</Th>
								<Th
									sorted={sortBy === "pseudo"}
									reversed={reverseSortDirection}
									onSort={() => setSorting("pseudo")}
									// tailwind={"hidden md:table-cell"}
									tailwind={"hidden lg:table-cell"}
								>
									Pseudo
								</Th>
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
								<th className="hidden lg:table-cell">Vérifié</th>
								<th className="hidden lg:table-cell ">Enregistré le</th>
								<th className=" ">Statut</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody className="">
							{sellersPro.length === 0 ? (
								<div className="ml-[25%]">
									<div>Aucun vendeur pro trouvé !</div>
								</div>
							) : (
								sellersPro.reverse()
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
