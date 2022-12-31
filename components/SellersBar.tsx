import React, { useState } from "react";
import { Select, Checkbox, createStyles, TextInput } from "@mantine/core";
import { IconChevronDown, IconSearch } from "@tabler/icons";
import Image from "next/image";
import editIcon from "../public/edit-icon.svg";
import removeIcon from "../public/remove-icon.svg";

let statutes = ["new", "actif", "attente", "inactif"];

const useStyles = createStyles((theme) => ({
	rowSelected: {
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.fn.rgba(theme.colors[theme.primaryColor][1], 0.2)
				: theme.colors[theme.primaryColor][0],
	},
}));

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
		return "bg-purple-500 ";
	} else if (statut === "actif") {
		return "bg-green-500 ";
	} else if (statut === "attente") {
		return "bg-orange-500 ";
	} else if (statut === "inactif") {
		return "bg-red-400 ";
	}
}

function SellersBar({ user, selection, toggleRow }: any) {
	const { classes, cx } = useStyles();
	const [selectedStatut, setSelectedStatut] = useState(user.statut);
	const selected = selection.includes(user._id);
	return (
		<tr key={user.email} className={`${selected ? "bg-green-100" : ""}`}>
			<td>
				<Checkbox
					classNames={{
						input: `${selected ? "bg-green-500" : ""}`,
					}}
					checked={selection.includes(user._id)}
					onChange={() => toggleRow(user._id)}
					transitionDuration={0}
				/>
			</td>
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
						input: `${getSelectStyles(
							selectedStatut
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
					defaultValue={user.statut}
					onChange={(e) => {
						setSelectedStatut(e);
					}}
					data={[
						{ value: "actif", label: getLabel("actif") },
						{ value: "attente", label: getLabel("attente") },
						{ value: "inactif", label: getLabel("inactif") },
						{ value: "new", label: getLabel("new") },
					]}
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
