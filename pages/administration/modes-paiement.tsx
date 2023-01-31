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
import MarqueBar from "../../components/marqueBar";
import MarqueModal from "../../components/MarqueModal";
import ModesPaiementsBar from "../../components/modesPaiementBar";
import ModesPaiementBar from "../../components/modesPaiementBar";
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
	const isOpened = useContext(OpenedContext);
	const [changedByBulkIds, setChangedByBulkIds] = useState<any>([]);
	const [newLibelle, setNewLibelle] = useState("");
	const [openedModal, setOpenedModal] = useState(false);
	const [openedArchiveModal, setOpenedArchiveModal] = useState(false);
	const [openedArchiveAllModal, setOpenedArchiveAllModal] = useState(false);

	// const router = useRouter();

	const [list, setList] = useState<any>([]);

	const CREATE_MODE = gql`
		mutation createModesPaiement(
			$createModesPaiementInput: CreateModesPaiementInput!
		) {
			createModesPaiement(createModesPaiementInput: $createModesPaiementInput) {
				_id
				mode_paiement
				statut
				created_at
			}
		}
	`;

	const ARCHIVE_MODE = gql`
		mutation removeModesPaiement($_id: String!) {
			removeModesPaiement(_id: $_id)
		}
	`;

	const REMOVE_ALL = gql`
		mutation removeAllModesPaiement {
			removeAllModesPaiement
		}
	`;

	// const openModal = (e: any) => {
	// 	return openConfirmModal({
	// 		className: "mt-[200px]",
	// 		confirmProps: {
	// 			className: "bg-green-500 hover:bg-green-600 rounded-2xl",
	// 		},
	// 		cancelProps: {
	// 			className: "rounded-2xl",
	// 		},
	// 		title: "Veuillez confirmer le changement de statut",
	// 		children: (
	// 			<p>
	// 				{e === "actif" ? (
	// 					<p>
	// 						Voulez vous rendre ces utilisateurs{" "}
	// 						<span className="text-green-500">Actif</span> ?
	// 					</p>
	// 				) : e === "inactif" ? (
	// 					<p>
	// 						Voulez vous rendre ces utilisateurs{" "}
	// 						<span className="text-red-400">Inactif</span> ?
	// 					</p>
	// 				) : (
	// 					<p>
	// 						Voulez vous rendre ces utilisateurs{" "}
	// 						<span className="text-red-400">Archivé</span> ?
	// 					</p>
	// 				)}
	// 			</p>
	// 		),
	// 		labels: { confirm: "Confirmer", cancel: "Abandonner" },
	// 		onCancel: () => {
	// 			setStatut(statut);
	// 		},
	// 		onConfirm: async () => {
	// 			try {
	// 				let s: any;
	// 				let test: any;
	// 				let arr: number[] = [];
	// 				if (e === "actif" || e === "inactif") {
	// 					for (s of selection) {
	// 						await updateStatut({
	// 							variables: {
	// 								_id: s,
	// 								updateBuyerInput: {
	// 									statut: e,
	// 								},
	// 							},
	// 						});
	// 					}
	// 				} else {
	// 					for (s of selection) {
	// 						await updateStatut({
	// 							variables: {
	// 								_id: s,
	// 								updateBuyerInput: {
	// 									isArchived: true,
	// 								},
	// 							},
	// 						});
	// 						arr.push(s);
	// 						// setList({ sellers: test });
	// 						// console.log("test: ", test);
	// 					}
	// 					// console.log("arr: ", arr);
	// 					test = list.buyers.filter(
	// 						(buyer: any) => !arr.includes(buyer.userId)
	// 					);

	// 					setList({ buyers: test });
	// 					// setList({ sellers: test });
	// 				}
	// 				setChangedByBulkIds(selection);
	// 				if (e !== "archive") setStatut(() => e);
	// 				setSelection([]);
	// 				showNotification({
	// 					title: `${
	// 						e !== "archive" ? "Changement de multiple statut" : "Archivage"
	// 					}`,
	// 					message: `${
	// 						e !== "archive"
	// 							? "Statuts changé avec success"
	// 							: "Archivage fait avec success"
	// 					}`,
	// 					color: "green",
	// 					autoClose: 5000,
	// 					bottom: "630px",
	// 					// top: "0px",
	// 					// classNames: {
	// 					// 	root: "translate-y-[-500px]",
	// 					// },
	// 				});
	// 			} catch (e) {
	// 				alert(e);
	// 				showNotification({
	// 					title: "Changement de statut impossible",
	// 					message: "Une erreur s'est produite",
	// 					color: "red",
	// 					autoClose: 5000,
	// 					bottom: "630px",
	// 				});
	// 			}
	// 		},
	// 	});
	// };

	const [createModePaiement, statutCreatedModePaiement] =
		useMutation(CREATE_MODE);
	const [archiveModePaiement, archiveModePaiementResult] =
		useMutation(ARCHIVE_MODE);
	const [removeAllmodesPaiement, removeAllResult] = useMutation(REMOVE_ALL);

	// const openCreateMarqueModal = (e: any) => {
	// 	return openConfirmModal({
	// 		className: "mt-[200px]",
	// 		confirmProps: {
	// 			className: "bg-green-500 hover:bg-green-600 rounded-2xl",
	// 		},
	// 		cancelProps: {
	// 			className: "rounded-2xl",
	// 		},
	// 		title: "Ajouter une marque",
	// 		children: (
	// 			<div className="flex justify-center m-auto w-full">
	// 				<input
	// 					className="w-full border"
	// 					type={"text"}
	// 					onChange={(e) => setNewLibelle("e.target.value")}
	// 				/>
	// 			</div>
	// 		),
	// 		labels: { confirm: "Confirmer", cancel: "Abandonner" },
	// 		onCancel: () => {
	// 			setStatut(statut);
	// 		},
	// 		onConfirm: async () => {
	// 			console.log(newLibelle);
	// 			// try {
	// 			// 	const marqueCreated = await createMarque({
	// 			// 		variables: {
	// 			// 			createMarqueInput: {
	// 			// 				libelle: newLibelle,
	// 			// 			},
	// 			// 		},
	// 			// 	});
	// 			// 	setNewLibelle("");
	// 			// 	// setList([...list, marqueCreated.data]);
	// 			// 	showNotification({
	// 			// 		title: `${"Creation marque"}`,
	// 			// 		message: `${"Creation marque avec success"}`,
	// 			// 		color: "green",
	// 			// 		autoClose: 5000,
	// 			// 		bottom: "630px",
	// 			// 	});
	// 			// } catch (e) {
	// 			// 	setNewLibelle("");
	// 			// 	alert(e);
	// 			// 	showNotification({
	// 			// 		title: "Creation marque impossible",
	// 			// 		message: "Une erreur s'est produite",
	// 			// 		color: "red",
	// 			// 		autoClose: 5000,
	// 			// 		bottom: "630px",
	// 			// 	});
	// 			// }
	// 		},
	// 	});
	// };

	const ALL_MODES = gql`
		query modesPaiement {
			modesPaiement {
				_id
				mode_paiement
				statut
				created_at
			}
		}
	`;

	const { error, loading, data } = useQuery(ALL_MODES, {
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

	let modesData = data?.modesPaiement;
	let modesPaiement = [];
	// if (results.data) {
	// 	modesData = results.data.modesPaiementOcc;
	// }

	const setSorting = (field: keyof RowData) => {
		const reversed = field === sortBy ? !reverseSortDirection : false;
		setReverseSortDirection(reversed);
		setSortBy(field);
		modesData = sortData(modesData, { sortBy: field, reversed, search });
		setList({ modesPaiement: modesData });
	};

	const toggleRow = (id: string) =>
		setSelection((current: any) =>
			current.includes(id)
				? current.filter((item: any) => item !== id)
				: [...current, id]
		);
	const toggleAll = () =>
		setSelection((current) =>
			current.length === modesData.length
				? []
				: modesData.map((item: any) => item._id)
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
		modesData = sortData(modesData, {
			sortBy,
			reversed: reverseSortDirection,
			search: value,
		});
		console.log(modesData);
		setList({ modesPaiement: modesData });
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

	console.log("modesPaiement", list.modesPaiement);

	modesPaiement = list.modesPaiement.map((user: any) => {
		// console.log("isArchived: ", user);
		// if (!user.isArchived) {
		return (
			<ModesPaiementBar
				key={user._id}
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
			const modePaiementArchived = await removeAllmodesPaiement();
			// console.log("marqueArchived: ", marqueArchived.data.updateMarque._id);
			// let filtered = list.modesPaiement.filter((m: any) => m._id !== user._id);
			// filtered.push(marqueArchived.data.updateMarque);
			setList({ modesPaiement: [] });
			showNotification({
				title: `${"Supression de tout les modesPaiement"}`,
				message: `${"Supression de tout les modesPaiement avec success"}`,
				color: "green",
				autoClose: 5000,
				bottom: "630px",
			});
			// setUpdatedLibelle(() => marqueCreated.data.updateMarque.libelle);
			setOpenedArchiveAllModal(false);
		} catch (e: any) {
			// if (e.message === "libelle unmodified") {
			// 	setErr({ type: 1 });
			// }
			// if (e.message === "Cette marque existe déjà") {
			// 	setErr({ type: 2 });
			// }
			// setNewLibelle("");
			// alert(e);
			showNotification({
				title: "Supression marque impossible",
				message: "Une erreur s'est produite",
				color: "red",
				autoClose: 5000,
				bottom: "630px",
			});
		}
	};

	const marqueArchive = async (e: any) => {
		e.preventDefault();
		let arr: string[] = [];
		try {
			for (let s of selection) {
				const modeArchived = await archiveModePaiement({
					variables: {
						_id: s,
					},
				});
				arr.push(s);
			}
			// console.log("marqueArchived: ", marqueArchived.data.updateMarque._id);
			let test = list.modesPaiement.filter(
				(mode: any) => !arr.includes(mode._id)
			);
			// let filtered = list.modesPaiement.filter((m: any) => m._id !== user._id);
			// filtered.push(marqueArchived.data.updateMarque);
			setList({ modesPaiement: test });
			showNotification({
				title: `${"Supression mode de paiement"}`,
				message: `${"Supression mode de paiement avec success"}`,
				color: "green",
				autoClose: 5000,
				bottom: "630px",
			});
			// setUpdatedLibelle(() => marqueCreated.data.updateMarque.libelle);
			setOpenedArchiveModal(false);
		} catch (e: any) {
			// if (e.message === "libelle unmodified") {
			// 	setErr({ type: 1 });
			// }
			// if (e.message === "Cette marque existe déjà") {
			// 	setErr({ type: 2 });
			// }
			// setNewLibelle("");
			// alert(e);
			showNotification({
				title: "Supression mode de paiement impossible",
				message: "Une erreur s'est produite",
				color: "red",
				autoClose: 5000,
				bottom: "630px",
			});
		}
	};

	const marqueCreate = async (e: any) => {
		e.preventDefault();
		console.log("From new way: ", newLibelle);
		try {
			const modeCreated = await createModePaiement({
				variables: {
					createModesPaiementInput: {
						mode_paiement: newLibelle,
						description: "",
					},
				},
			});
			console.log("modeCreated: ", modeCreated);
			setNewLibelle("");
			setList({
				modesPaiement: [
					...list.modesPaiement,
					modeCreated.data.createModesPaiement,
				],
			});
			// modesData = list;
			showNotification({
				title: `${"Creation mode de paiement"}`,
				message: `${"Creation mode de paiement avec success"}`,
				color: "green",
				autoClose: 5000,
				bottom: "630px",
			});
			setOpenedModal(false);
		} catch (e) {
			setNewLibelle("");
			alert(e);
			showNotification({
				title: "Creation mode de paiement impossible",
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
				// title={`Voulez vous vraimment archiver la marque ${user.libelle}?`}
				title={<p>Voulez vous vraimment archiver ces modesPaiement ?</p>}
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
				// title={`Voulez vous vraimment archiver la marque ${user.libelle}?`}
				title={<p>Voulez vous vraimment archiver ces modesPaiement ?</p>}
				className="shadow-xl"
			>
				<div>
					<form onSubmit={(e) => marqueArchive(e)}>
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
				title="Ajouter une marque"
			>
				<form onSubmit={(e) => marqueCreate(e)}>
					<TextInput
						label="Libelle"
						onChange={(e) => setNewLibelle(e.target.value)}
					/>

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
				<p className="text-2xl mb-3 font-semibold">Modes paiement</p>
				{/* <button onClick={openCreateMarqueModal}> */}
				<button onClick={() => setOpenedModal(true)}>
					<IconCirclePlus size={35} />
				</button>
			</div>
			{/* <form className="">
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
								setList({ modesPaiement: datax.data.modesPaiementOcc });
							}}
						>
							Rechercher
						</button>
					</div>
				</div>
			</form> */}
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
									// checked={selection.length === modesData.length}
									indeterminate={
										false
										// selection.length > 0 &&
										// selection.length !== modesData.length
									}
									transitionDuration={0}
								/>
							</th>
							<th className="hidden lg:table-cell">ID</th>
							<th className="hidden lg:table-cell">Mode de paiement</th>
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
							<th className="w-1/5">Statut</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody className="">
						{modesPaiement.length === 0 ? (
							<div className="ml-[25%]">
								<div>No results found</div>
							</div>
						) : (
							modesPaiement.reverse()
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
