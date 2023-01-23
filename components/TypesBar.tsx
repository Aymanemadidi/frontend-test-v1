import React, { useEffect, useState } from "react";
import {
	Select,
	Checkbox,
	createStyles,
	TextInput,
	Modal,
} from "@mantine/core";
import { IconChevronDown, IconSearch } from "@tabler/icons";
import Image from "next/image";
import editIcon from "../public/edit-icon.svg";
import removeIcon from "../public/remove-icon.svg";
import { useLazyQuery, gql, useMutation } from "@apollo/client";
import { string } from "yup";
import { showNotification } from "@mantine/notifications";
import { openConfirmModal, openModal } from "@mantine/modals";
import Link from "next/link";
import { useRouter } from "next/router";

let statutes = ["new", "actif", "attente", "inactif"];

const useStyles = createStyles((theme) => ({
	rowSelected: {
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.fn.rgba(theme.colors[theme.primaryColor][1], 0.2)
				: theme.colors[theme.primaryColor][0],
	},
}));

// function getStatut(user: any) {
// 	console.log(user);
// 	if (user.statut_moderation === true) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// }

function getLabel(statut: string) {
	if (statut === "new") {
		return "Nouveau";
	} else if (statut === "actif") {
		return "Actif";
	} else if (statut === "attente") {
		return "En attente";
	} else if (statut === "inactif") {
		return "Inactif";
	}
}

function getSelectStyles(statut: string) {
	if (statut === "new") {
		return "bg-orange-500 ";
	} else if (statut === "actif") {
		return "bg-green-500 ";
	} else if (statut === "attente") {
		return "bg-orange-500 ";
	} else if (statut === "inactif") {
		return "bg-red-400 ";
	}
}

interface UpdateSellerInput {
	statut: string;
}

function TypesBar({
	user,
	selection,
	toggleRow,
	statut,
	ids,
	setList,
	list,
}: any) {
	// const [buyerStatut, setBuyerStatut] = useState(user.statut);
	// const [statutModeration, setStatutModeration] = useState(
	// 	user.statut_moderation
	// );
	const selected = selection.includes(user.userId);
	const [openedModal, setOpenedModal] = useState(false);
	const [openedArchiveModal, setOpenedArchivedModal] = useState(false);
	const [newLibelle, setNewLibelle] = useState(user.libelle);
	const [updatedLibelle, setUpdatedLibelle] = useState(user.libelle);
	const [forSeller, setForSeller] = useState(user.for_seller);
	const [forBuyer, setForBuyer] = useState(user.for_buyer);
	const [forUpdatedSeller, setForUpdatedSeller] = useState(user.for_seller);
	const [forUpdatedBuyer, setForUpdatedBuyer] = useState(user.for_buyer);
	const [err, setErr] = useState({ type: 0 });

	const router = useRouter();

	const date = `${user.created_at.slice(0, 10)} at ${user.created_at.slice(
		11,
		16
	)}`;

	const jour = date.slice(8, 10);
	const mois = date.slice(5, 7);
	const annee = date.slice(0, 4);
	const heure = date.slice(14, 19);

	// useEffect(() => {
	// 	if (statutModeration === "true" && sellerStatut !== "actif") {
	// 		console.log("for user: ", user.email);
	// 		console.log("statut for him: ", user.statut);
	// 		setSellerStatut("actif");
	// 	}
	// }, []);

	// console.log(user);

	// useEffect(() => {
	// 	if (statut !== "" && ids.includes(user.userId)) {
	// 		setBuyerStatut(statut);
	// 	}
	// });

	console.log(user);

	const ARCHIVE_TYPE_USER = gql`
		mutation removeTypeUser($_id: String!) {
			removeTypeUser(_id: $_id)
		}
	`;

	const UPDATE_TYPE_USER = gql`
		mutation updateTypeUser($updateTypeUserInput: UpdateTypeUserInput!) {
			updateTypeUser(updateTypeUserInput: $updateTypeUserInput) {
				_id
				libelle
				created_at
				for_buyer
				for_seller
			}
		}
	`;

	// const UPDATE_STATUT = gql`
	// 	mutation updateSeller(
	// 		$_id: String!
	// 		$updateSellerInput: UpdateSellerInput!
	// 	) {
	// 		updateSeller(_id: $_id, updateSellerInput: $updateSellerInput) {
	// 			_id
	// 			firstName
	// 			email
	// 		}
	// 	}
	// `;

	const [updateTypeUser, { error, loading, data }] =
		useMutation(UPDATE_TYPE_USER);
	const [archiveTypeUser, archiveTypeUserResult] =
		useMutation(ARCHIVE_TYPE_USER);

	function getSelectStyles(statut: string) {
		if (statut === "new") {
			return "bg-purple-500 ";
		} else if (statut === "actif") {
			return "bg-green-500 ";
		} else if (statut === "attente") {
			return "bg-orange-500 ";
		} else if (statut === "inactif") {
			return "bg-red-400 ";
		}
	}

	// const archiveModal = (e: any) =>
	// 	openConfirmModal({
	// 		className: "mt-[200px]",
	// 		confirmProps: {
	// 			className: "bg-green-500 hover:bg-green-600 rounded-2xl",
	// 		},
	// 		cancelProps: {
	// 			className: "rounded-2xl",
	// 		},
	// 		title: "Veuillez confirmer l'archivage",
	// 		children: (
	// 			<p>
	// 				<p>Voulez vous archivé cet utilisateur</p>
	// 			</p>
	// 		),
	// 		labels: { confirm: "Confirmer", cancel: "Abandonner" },
	// 		onCancel: () => {},
	// 		onConfirm: async () => {
	// 			try {
	// 				await updateStatut({
	// 					variables: {
	// 						_id: user.userId,
	// 						updateBuyerInput: {
	// 							isArchived: true,
	// 						},
	// 					},
	// 				});
	// 				// console.log("list:", list);
	// 				let test = list.buyers.filter(
	// 					(buyer: any) => buyer.userId !== user.userId
	// 				);
	// 				// console.log("test: ", test);
	// 				setList({ buyers: test });
	// 				showNotification({
	// 					title: "Archivage",
	// 					message: "Archivage fait avec success",
	// 					color: "green",
	// 					autoClose: 5000,
	// 					bottom: "630px",
	// 					// top: "0px",
	// 					// classNames: {
	// 					// 	root: "translate-y-[-500px]",
	// 					// },
	// 				});
	// 			} catch (error) {
	// 				showNotification({
	// 					title: "Archivahe impossible",
	// 					message: "Erreur",
	// 					color: "red",
	// 					autoClose: 5000,
	// 					bottom: "630px",
	// 				});
	// 			}
	// 		},
	// 	});

	// const openModal = (e: any) =>
	// 	openConfirmModal({
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
	// 						Voulez vous rendre cet utilisateur{" "}
	// 						<span className="text-green-500">Actif</span> ?
	// 					</p>
	// 				) : (
	// 					<p>
	// 						Voulez vous rendre cet utilisateur{" "}
	// 						<span className="text-red-400">Inactif</span> ?
	// 					</p>
	// 				)}
	// 			</p>
	// 		),
	// 		labels: { confirm: "Confirmer", cancel: "Abandonner" },
	// 		onCancel: () => {
	// 			setBuyerStatut(buyerStatut);
	// 		},
	// 		onConfirm: async () => {
	// 			await updateStatut({
	// 				variables: {
	// 					_id: user.userId,
	// 					updateBuyerInput: {
	// 						statut: e,
	// 					},
	// 				},
	// 			});
	// 			setBuyerStatut(() => e);
	// 			showNotification({
	// 				title: "Changement de statut",
	// 				message: "Statut changé avec success",
	// 				color: "green",
	// 				autoClose: 5000,
	// 				bottom: "630px",
	// 			});
	// 		},
	// 	});

	const typeUserArchive = async (e: any) => {
		e.preventDefault();
		try {
			const typeUserArchived = await archiveTypeUser({
				variables: {
					_id: user._id,
				},
			});
			let filtered = list.typeUsers.filter((m: any) => m._id !== user._id);
			setList({ typeUsers: [...filtered] });
			showNotification({
				title: `${"Supression marque"}`,
				message: `${"Supression marque avec success"}`,
				color: "green",
				autoClose: 5000,
				bottom: "630px",
			});
			// setUpdatedLibelle(() => marqueCreated.data.updateMarque.libelle);
			setOpenedModal(false);
		} catch (e: any) {
			if (e.message === "libelle unmodified") {
				setErr({ type: 1 });
			}
			if (e.message === "Cette marque existe déjà") {
				setErr({ type: 2 });
			}
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

	const typeUserUpdate = async (e: any) => {
		e.preventDefault();
		console.log("From update: ");
		try {
			const typeUserCreated = await updateTypeUser({
				variables: {
					updateTypeUserInput: {
						_id: user._id,
						libelle: newLibelle,
						for_buyer: forBuyer,
						for_seller: forSeller,
					},
				},
			});
			setForUpdatedBuyer(forBuyer);
			setForUpdatedSeller(forSeller);
			console.log(
				"typeUserCreated: ",
				typeUserCreated.data.updateTypeUser.libelle
			);
			// let filtered = list.typeUsers.filter(
			// 	(m: any) => m._id !== typeUserCreated.data.typeUsers._id
			// );
			// filtered.push(typeUserCreated.data.updateMarque);
			// setList({ marques: [...filtered] });
			showNotification({
				title: `${"Modification marque"}`,
				message: `${"Modification marque avec success"}`,
				color: "green",
				autoClose: 5000,
				bottom: "630px",
			});
			// setUpdatedLibelle("hello");
			setUpdatedLibelle(() => typeUserCreated.data.updateTypeUser.libelle);
			setOpenedModal(false);
		} catch (e: any) {
			if (e.message === "libelle unmodified") {
				setErr({ type: 1 });
			}
			if (e.message === "Cette marque existe déjà") {
				setErr({ type: 2 });
			}
			// setNewLibelle("");
			// alert(e);
			showNotification({
				title: "Modification marque impossible",
				message: "Une erreur s'est produite",
				color: "red",
				autoClose: 5000,
				bottom: "630px",
			});
		}
	};

	return (
		<>
			<Modal
				opened={openedArchiveModal}
				onClose={() => setOpenedArchivedModal(false)}
				// title={`Voulez vous vraimment archiver la marque ${user.libelle}?`}
				title={
					<p>
						Voulez vous vraimment archiver la marque{" "}
						<span className="text-red-500 font-semibold">{user.libelle}</span> ?
					</p>
				}
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
								onClick={() => setOpenedArchivedModal(false)}
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
				title="Introduce yourself!"
				className="shadow-xl"
			>
				<div>
					<form onSubmit={(e) => typeUserUpdate(e)}>
						<TextInput
							label="Libelle"
							value={newLibelle}
							onChange={(e) => {
								setNewLibelle(e.target.value);
							}}
						/>
						{err.type === 1 ? (
							<span className="text-red-500">Libelle n'as pas été changer</span>
						) : err.type === 2 ? (
							<span className="text-red-500">Libelle deja utilisé</span>
						) : (
							""
						)}
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
								Confirmer
							</button>
						</div>
					</form>
				</div>
			</Modal>
			<tr
				key={user._id}
				className={`${selected ? "bg-green-100" : ""} flex-col`}
			>
				<td>
					<Checkbox
						classNames={{
							input: `${selected ? "bg-green-500" : ""}`,
						}}
						checked={selection.includes(user._id)}
						onChange={() => toggleRow(user._id)}
						// disabled={user.statut === "new"}
						transitionDuration={0}
					/>
				</td>
				{/* <td className="text-xs font-light">{user.userId}</td> */}
				<td className="hidden lg:table-cell text-xs font-light">
					{user._id.slice(0, 5)}
				</td>
				<td className="hidden lg:table-cell text-xs font-light">
					{updatedLibelle}
				</td>
				<td className="hidden lg:table-cell text-xs font-light">
					{forUpdatedBuyer && forUpdatedSeller ? (
						<div className="flex gap-1">
							<span className="bg-purple-500 px-3 py-2 rounded-2xl text-xs text-white">
								Vendeur
							</span>
							<span className="bg-blue-500 px-3 py-2 rounded-2xl text-xs text-white">
								Acheteur
							</span>
						</div>
					) : forUpdatedBuyer ? (
						<span className="bg-blue-500 px-3 py-2 rounded-2xl text-xs text-white">
							Acheteur
						</span>
					) : forUpdatedSeller ? (
						<span className="bg-purple-500 px-3 py-2 rounded-2xl text-xs text-white">
							Vendeur
						</span>
					) : (
						""
					)}
				</td>
				{/* <td className="hidden lg:table-cell text-xs font-light">
				{user.typeVendeur ? "Vendeur Pro" : "Vendeur"}
			</td> */}

				<td className="hidden lg:table-cell">
					<p className="text-xs font-light">
						{jour}/{mois}/{annee}
					</p>
				</td>
				<td className="flex gap-3">
					<button onClick={() => setOpenedModal(true)}>
						<Image
							className={`translate-y-2`}
							alt="edit"
							src={editIcon}
							height={20}
						/>
					</button>
					<button onClick={() => setOpenedArchivedModal(true)}>
						<Image
							className={`translate-y-2`}
							alt="edit"
							src={removeIcon}
							height={20}
							// onClick={archiveModal}
						/>
					</button>
				</td>
			</tr>
		</>
	);
}

export default TypesBar;
