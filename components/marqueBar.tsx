import React, { useEffect, useState } from "react";
import { Select, Checkbox, createStyles, TextInput } from "@mantine/core";
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

function MarqueBar({
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
	const [showInput, setShowInput] = useState(false);

	const router = useRouter();

	console.log("date: ", user.created_at);

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

	const UPDATE_STATUT = gql`
		mutation updateBuyer($_id: String!, $updateBuyerInput: UpdateBuyerInput!) {
			updateBuyer(_id: $_id, updateBuyerInput: $updateBuyerInput) {
				_id
				firstName
				email
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

	const [updateStatut, { error, loading, data }] = useMutation(UPDATE_STATUT);

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

	const archiveModal = (e: any) =>
		openConfirmModal({
			className: "mt-[200px]",
			confirmProps: {
				className: "bg-green-500 hover:bg-green-600 rounded-2xl",
			},
			cancelProps: {
				className: "rounded-2xl",
			},
			title: "Veuillez confirmer l'archivage",
			children: (
				<p>
					<p>Voulez vous archivé cet utilisateur</p>
				</p>
			),
			labels: { confirm: "Confirmer", cancel: "Abandonner" },
			onCancel: () => {},
			onConfirm: async () => {
				try {
					await updateStatut({
						variables: {
							_id: user.userId,
							updateBuyerInput: {
								isArchived: true,
							},
						},
					});
					// console.log("list:", list);
					let test = list.buyers.filter(
						(buyer: any) => buyer.userId !== user.userId
					);
					// console.log("test: ", test);
					setList({ buyers: test });
					showNotification({
						title: "Archivage",
						message: "Archivage fait avec success",
						color: "green",
						autoClose: 5000,
						bottom: "630px",
						// top: "0px",
						// classNames: {
						// 	root: "translate-y-[-500px]",
						// },
					});
				} catch (error) {
					showNotification({
						title: "Archivahe impossible",
						message: "Erreur",
						color: "red",
						autoClose: 5000,
						bottom: "630px",
					});
				}
			},
		});

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
	return (
		<tr key={user._id} className={`${selected ? "bg-green-100" : ""} flex-col`}>
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
				{user.libelle}
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
				<Link
					href={{
						pathname: `/marques/${user.userId}`,
					}}
				>
					<button>
						<Image
							className={`translate-y-2`}
							alt="edit"
							src={editIcon}
							height={20}
						/>
					</button>
				</Link>
				<button>
					<Image
						className={`translate-y-2`}
						alt="edit"
						src={removeIcon}
						height={20}
						onClick={archiveModal}
					/>
				</button>
			</td>
		</tr>
	);
}

export default MarqueBar;
