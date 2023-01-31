import React, { useEffect, useState } from "react";
import { Select, Checkbox, createStyles, TextInput } from "@mantine/core";
import { IconArrowBackUp, IconChevronDown, IconSearch } from "@tabler/icons";
import Image from "next/image";
import editIcon from "../public/edit-icon.svg";
import removeIcon from "../public/remove-icon.svg";
import { useLazyQuery, gql, useMutation } from "@apollo/client";
import { string } from "yup";
import { showNotification } from "@mantine/notifications";
import { openConfirmModal, openModal } from "@mantine/modals";
import Link from "next/link";
import { useRouter } from "next/router";
import { userAgent } from "next/server";

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

function BuyersBar({
	user,
	selection,
	toggleRow,
	statut,
	ids,
	setList,
	list,
}: any) {
	const [userStatut, setUserStatut] = useState(
		`${
			user.seller !== null
				? user.seller.statut
				: user.buyer !== null
				? user.buyer.statut
				: user.statut
		}`
	);

	console.log("user.statut: ", user.statut);
	// const [statutModeration, setStatutModeration] = useState(
	// 	user.statut_moderation
	// );
	const selected = selection.includes(user.userId);
	const [showInput, setShowInput] = useState(false);

	const router = useRouter();

	const date = `${
		user.seller
			? user.seller.created_at.slice(0, 10)
			: user.buyer
			? user.buyer.created_at.slice(0, 10)
			: "2023-01-05T13:53:55.756Z".slice(0, 10)
	} at ${
		user.seller
			? user.seller.created_at.slice(11, 16)
			: user.buyer
			? user.buyer.created_at.slice(11, 16)
			: "2023-01-05T13:53:55.756Z".slice(11, 16)
	}`;

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

	function getLabel(statut: string) {
		if (statut === "new") {
			if (user.buyer) {
				return "Nouveau";
			} else if (user.seller) {
				return "En attente";
			}
		} else if (statut === "actif") {
			return "Actif";
		} else if (statut === "attente") {
			return "En attente";
		} else if (statut === "inactif") {
			return "Inactif";
		}
	}

	useEffect(() => {
		if (
			statut !== "" &&
			ids.some((element: any) => element.includes(user._id))
		) {
			setUserStatut(statut);
		}
	});

	let UPDATE_STATUT = gql`
		mutation updateBuyer($_id: String!, $updateBuyerInput: UpdateBuyerInput!) {
			updateBuyer(_id: $_id, updateBuyerInput: $updateBuyerInput) {
				_id
				firstName
				email
			}
		}
	`;
	if (user.seller) {
		UPDATE_STATUT = gql`
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
	} else if (user.buyer === null) {
		UPDATE_STATUT = gql`
			mutation updateUser($_id: String!, $updateUserInput: UpdateUserInput!) {
				updateUser(_id: $_id, updateUserInput: $updateUserInput) {
					_id
					firstName
					email
				}
			}
		`;
	}

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
			if (user.buyer) {
				return "bg-purple-500 ";
			} else if (user.seller) {
				return "bg-orange-500";
			}
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
					if (user.buyer) {
						await updateStatut({
							variables: {
								_id: user._id,
								updateBuyerInput: {
									isArchived: true,
								},
							},
						});
					} else if (user.seller) {
						await updateStatut({
							variables: {
								_id: user._id,
								updateSellerInput: {
									isArchived: true,
								},
							},
						});
					} else {
						await updateStatut({
							variables: {
								_id: user._id,
								updateUserInput: {
									isArchived: true,
								},
							},
						});
					}
					// console.log("list:", list);
					let test = list.usersWithAgregation.filter(
						(user2: any) => user2._id !== user._id
					);
					// console.log("test: ", test);
					setList({ usersWithAgregation: test });
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

	const restoreModal = (e: any) =>
		openConfirmModal({
			className: "mt-[200px]",
			confirmProps: {
				className: "bg-green-500 hover:bg-green-600 rounded-2xl",
			},
			cancelProps: {
				className: "rounded-2xl",
			},
			title: "Veuillez confirmer votre action",
			children: (
				<p>
					<p>Voulez vous vraiment restaurer cet utilisateur</p>
				</p>
			),
			labels: { confirm: "Confirmer", cancel: "Abandonner" },
			onCancel: () => {},
			onConfirm: async () => {
				try {
					if (user.buyer) {
						await updateStatut({
							variables: {
								_id: user._id,
								updateBuyerInput: {
									isArchived: false,
								},
							},
						});
					} else if (user.seller) {
						await updateStatut({
							variables: {
								_id: user._id,
								updateSellerInput: {
									isArchived: false,
								},
							},
						});
					} else {
						await updateStatut({
							variables: {
								_id: user._id,
								updateUserInput: {
									isArchived: false,
								},
							},
						});
					}
					// console.log("list:", list);
					let test = list.usersWithAgregation.filter(
						(user2: any) => user2._id !== user._id
					);
					// console.log("test: ", test);
					setList({ usersWithAgregation: test });
					showNotification({
						title: "Restorage",
						message: "Restorage faite avec success",
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
						title: "Restorage impossible",
						message: "Erreur",
						color: "red",
						autoClose: 5000,
						bottom: "630px",
					});
				}
			},
		});

	const openModal = (e: any) =>
		openConfirmModal({
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
							Voulez vous rendre cet utilisateur{" "}
							<span className="text-green-500">Actif</span> ?
						</p>
					) : (
						<p>
							Voulez vous rendre cet utilisateur{" "}
							<span className="text-red-400">Inactif</span> ?
						</p>
					)}
				</p>
			),
			labels: { confirm: "Confirmer", cancel: "Abandonner" },
			onCancel: () => {
				setUserStatut(userStatut);
			},
			onConfirm: async () => {
				if (user.buyer) {
					await updateStatut({
						variables: {
							_id: user._id,
							updateBuyerInput: {
								statut: e,
							},
						},
					});
				} else if (user.seller) {
					await updateStatut({
						variables: {
							_id: user._id,
							updateSellerInput: {
								statut: e,
							},
						},
					});
				} else {
					await updateStatut({
						variables: {
							_id: user._id,
							updateUserInput: {
								statut: e,
							},
						},
					});
				}
				setUserStatut(() => e);
				showNotification({
					title: "Changement de statut",
					message: "Statut changé avec success",
					color: "green",
					autoClose: 5000,
					bottom: "630px",
				});
			},
		});
	return (
		<tr
			key={user.email}
			className={`${selected ? "bg-green-100" : ""} flex-col`}
		>
			<td>
				<Checkbox
					classNames={{
						input: `${selected ? "bg-green-500" : ""}`,
					}}
					checked={selection.some((s: any) => s.includes(user._id))}
					onChange={() => toggleRow([user._id, user.role])}
					// disabled={user.statut === "new"}
					transitionDuration={0}
				/>
			</td>
			{/* <td className="text-xs font-light">{user.userId}</td> */}
			<td className="hidden lg:table-cell text-xs font-light">
				{user._id.slice(0, 5)}
			</td>
			<td className="text-xs font-light">
				{user.seller
					? user.seller.nomEntreprise
					: user.buyer
					? user.buyer.nomEntreprise
					: ""}
			</td>
			<td className="hidden lg:table-cell text-xs font-light">
				<span
					className={`${showInput ? "hidden" : ""}`}
					onDoubleClick={() => setShowInput(true)}
				>
					{user.seller
						? user.seller.pseudo
						: user.buyer
						? user.buyer.pseudo
						: ""}
				</span>
				{/* {user.seller ? user.seller.pseudo : user.buyer ? user.buyer.pseudo : ""} */}
				<form
					className={`${showInput ? "" : "hidden"}`}
					action=""
					onSubmit={(e) => {
						e.preventDefault();
						setShowInput(false);
						console.log("hey");
					}}
				>
					<input
						type="text"
						className="w-[100px] py-2 px-2 border"
						value={
							user.seller
								? user.seller.pseudo
								: user.buyer
								? user.buyer.pseudo
								: ""
						}
					/>
				</form>
			</td>
			<td className="hidden lg:table-cell text-xs font-light">{user.email}</td>
			<td className="hidden lg:table-cell text-xs font-light">
				{user.role === "Seller"
					? user.seller?.isPro === true
						? "Vendeur Pro"
						: "Vendeur"
					: user.role === "Buyer"
					? "Acheteur"
					: user.role === "BuyerSeller"
					? "Vendeur/Acheteur"
					: "Admin"}
			</td>
			<td className=" hidden lg:table-cell text-xs font-light">
				{user.seller
					? user.seller.type.libelle
					: user.buyer
					? user.buyer.type.libelle
					: ""}
			</td>
			{/* <td className="hidden lg:table-cell">
				<p className="text-xs font-light">
					{user.verified ? "Verifié" : "Non"}
				</p>
			</td>*/}
			<td className="hidden lg:table-cell">
				<p className="text-xs font-light">
					{jour}/{mois}/{annee}
				</p>
			</td>
			<td>
				<Select
					classNames={{
						input: `${getSelectStyles(
							userStatut
						)} text-white rounded-2xl text-xs font-normal`,
					}}
					rightSection={<IconChevronDown size={14} color={"white"} />}
					rightSectionWidth={30}
					// defaultValue={"userStatut"}
					value={userStatut}
					// defaultValue={user.statut_moderation === "true" ? "actif" : user.statut}
					onChange={async (e) => {
						openModal(e);
					}}
					data={
						userStatut === "new"
							? [
									{
										value: "actif",
										label: getLabel("actif"),
										disabled: user.seller?.statut_moderation === "false",
									},
									{
										value: "new",
										label: getLabel("new"),
									},
									// { value: "attente", label: getLabel("attente") },
									{
										value: "inactif",
										label: getLabel("inactif"),
										disabled: user.seller?.statut_moderation === "false",
									},
							  ]
							: [
									{
										value: "actif",
										label: getLabel("actif"),
									},
									// { value: "attente", label: getLabel("attente") },
									{
										value: "inactif",
										label: getLabel("inactif"),
									},
							  ]
					}
				/>
			</td>
			<td className="flex gap-3">
				<Link
					href={{
						pathname: `${
							user.role === "Buyer"
								? `/acheteurs/${user._id}`
								: user.role === "Seller"
								? `/vendeurs/${user._id}`
								: `/admins/${user._id}`
						}`,
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
				<button
					className={`mt-1 ${
						user.seller?.isArchived ||
						user.buyer?.isArchived ||
						user?.isArchived
							? ""
							: "hidden"
					}`}
					onClick={restoreModal}
				>
					<IconArrowBackUp color={"#676C86"} />
				</button>
				<button>
					<Image
						// className={`translate-y-2`}
						className={`mt-1 ${
							user.seller?.isArchived === false ||
							user.buyer?.isArchived === false ||
							user?.isArchived === false
								? ""
								: "hidden"
						}`}
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

export default BuyersBar;
