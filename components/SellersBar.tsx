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

function SellersBar({ user, selection, toggleRow, statut, ids }: any) {
	if (user.email === "new5@Seller.com") {
		console.log("statut from parent: ", statut);
	}
	const { classes, cx } = useStyles();
	const [sellerStatut, setSellerStatut] = useState(
		// statut
		user.statut
	);
	const [statutModeration, setStatutModeration] = useState(
		user.statut_moderation
	);
	const selected = selection.includes(user.userId);

	// useEffect(() => {
	// 	if (statutModeration === "true" && sellerStatut !== "actif") {
	// 		console.log("for user: ", user.email);
	// 		console.log("statut for him: ", user.statut);
	// 		setSellerStatut("actif");
	// 	}
	// }, []);

	// console.log(user);

	useEffect(() => {
		if (statut !== "" && ids.includes(user.userId)) {
			setSellerStatut(statut);
		}
	});

	const UPDATE_STATUT = gql`
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

	const [updateStatut, { error, loading, data }] = useMutation(UPDATE_STATUT);

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
				setSellerStatut(sellerStatut);
			},
			onConfirm: async () => {
				await updateStatut({
					variables: {
						_id: user.userId,
						updateSellerInput: {
							statut: e,
						},
					},
				});
				setSellerStatut(() => e);
				showNotification({
					title: "Changement de statut",
					message: "Statut changé avec success",
					color: "green",
					autoClose: 5000,
				});
			},
		});

	if (user.email === "aymaneSeller6@gmail.com") {
		console.log("statutModeration: ", user.statut_moderation);
	}
	return (
		<tr key={user.email} className={`${selected ? "bg-green-100" : ""}`}>
			<td>
				<Checkbox
					classNames={{
						input: `${selected ? "bg-green-500" : ""}`,
					}}
					checked={selection.includes(user.userId)}
					onChange={() => toggleRow(user.userId)}
					// disabled={user.statut === "new"}
					transitionDuration={0}
				/>
			</td>
			{/* <td className="text-xs font-light">{user.userId}</td> */}
			<td className="text-xs font-light">{user._id.slice(0, 5)}</td>
			<td className="text-xs font-light">{user.nomEntreprise}</td>
			<td className="text-xs font-light">{user.pseudo}</td>
			<td className="text-xs font-light">{user.email}</td>
			<td className="text-xs font-light">
				{user.typeVendeur ? "Vendeur Pro" : "Vendeur"}
			</td>
			<td className="text-xs font-light">
				{user.typeCompte ? "Auto Entrepreneur" : "Entreprise"}
			</td>
			<td className="">
				<p className="text-xs font-light">
					{user.verified ? "Verifié" : "Non"}
				</p>
			</td>
			<td className="">
				<p className="text-xs font-light">
					{user.created_at.slice(0, 10)} at {user.created_at.slice(11, 16)}
				</p>
			</td>
			<td>
				<Select
					classNames={{
						// input: `${getSelectStyles(
						// 	sellerStatut
						// )} text-white rounded-2xl text-xs font-normal`,
						input: `${getSelectStyles(
							sellerStatut
						)} text-white rounded-2xl text-xs font-normal`,
					}}
					rightSection={
						<IconChevronDown
							size={14}
							color={"white"}
							// style={{ marginRight: "10px" }}
						/>
					}
					rightSectionWidth={30}
					defaultValue={
						user.statut_moderation === "true" && sellerStatut === "actif"
							? "actif"
							: sellerStatut
					}
					value={sellerStatut}
					// defaultValue={user.statut_moderation === "true" ? "actif" : user.statut}
					onChange={async (e) => {
						// setStatutModeration(!statutModeration);
						// console.log(e);
						openModal(e);
					}}
					data={
						statutModeration === "true"
							? [
									{
										value: "actif",
										label: getLabel("actif"),
										disabled: user.statut_moderation === "false",
									},
									// { value: "attente", label: getLabel("attente") },
									{
										value: "inactif",
										label: getLabel("inactif"),
										disabled: user.statut_moderation === "false",
									},
							  ]
							: [
									{
										value: "actif",
										label: getLabel("actif"),
										disabled: user.statut_moderation === "false",
									},
									// { value: "attente", label: getLabel("attente") },
									{
										value: "inactif",
										label: getLabel("inactif"),
										disabled: user.statut_moderation === "false",
									},
									{ value: "new", label: getLabel("attente") },
							  ]
					}
				/>
			</td>
			<td className="flex gap-3">
				<button>
					<Image
						className={`translate-y-2`}
						alt="edit"
						src={editIcon}
						height={20}
					/>
				</button>
				<button>
					<Image
						className={`translate-y-2`}
						alt="edit"
						src={removeIcon}
						height={20}
					/>
				</button>
			</td>
		</tr>
	);
}

export default SellersBar;
