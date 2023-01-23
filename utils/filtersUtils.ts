import { keys } from "@mantine/utils";

export interface RowData {
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

export interface TableSortProps {
	data: RowData[];
}

export interface ThProps {
	children: React.ReactNode;
	reversed: boolean;
	sorted: boolean;
	onSort(): void;
	tailwind: string;
}

export function filterData(data: RowData[], search: string) {
	const query = search.toLowerCase().trim();
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

export function sortData(
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

export function getStartAndEndFromRange(range: any) {
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
