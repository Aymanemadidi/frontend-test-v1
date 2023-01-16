import { Checkbox, Select, Table, TextInput, ThemeIcon } from "@mantine/core";
import {
	IconBadge,
	IconChecklist,
	IconChevronDown,
	IconCirclePlus,
	IconCurrencyEuro,
	IconList,
	IconListCheck,
	IconMessage,
	IconReceipt,
	IconSearch,
	IconShoppingBag,
	IconStar,
	IconTruck,
	IconUser,
} from "@tabler/icons";
import { FaqSimple } from "../components/Accordion";
import { Th } from "../pages/vendeurs";

const mockDate = "2023-01-08T23:00:00.000Z";

const jour = mockDate.slice(8, 10);
const mois = mockDate.slice(5, 7);
const annee = mockDate.slice(0, 4);
const heure = mockDate.slice(14, 19);

const MockProductsData = [
	{
		orderId: "43343",
		owner: "EuAutomation",
		date: `${jour}/${mois}`,
		statut: "Payée en attente de traitement",
		price: "100$",
		statutId: 1,
	},
	{
		orderId: "43343",
		owner: "AccelomitalRPCFrance",
		date: `${jour}/${mois}`,
		statut: "Paiment en cours",
		price: "100$",
		statutId: 2,
	},
	{
		orderId: "43343",
		owner: "EuAutomation",
		date: `${jour}/${mois}`,
		statut: "Traitée",
		price: "100$",
		statutId: 3,
	},
	{
		orderId: "43343",
		owner: "AccelomitalRPCFrance",
		date: `${jour}/${mois}`,
		statut: "Paiment en cours",
		price: "100$",
		statutId: 2,
	},
	{
		orderId: "43343",
		owner: "EuAutomation",
		date: `${jour}/${mois}`,
		statut: "Payée en attente de traitement",
		price: "100$",
		statutId: 1,
	},
];

const orders = MockProductsData.map((order, i) => {
	return (
		<tr className={`flex-col`}>
			<td className="text-xs font-normal">
				<p className="text-[13px] font-600 ">{order.orderId}</p>
			</td>
			<td className="hidden md:table-cell">{order.date}</td>
			<td className=" text-xs font-light">
				<p className="text-[13px]">{order.price}</p>
			</td>
			<td>
				<div>
					<ThemeIcon
						variant="filled"
						color={
							order.statutId === 1
								? "orange"
								: order.statutId === 2
								? "violet"
								: "teal"
						}
						radius="xl"
						size="sm"
						className="w-fit px-3 py-1"
					>
						<p className="text-[10px] font-normal">{order.statut}</p>
					</ThemeIcon>
				</div>
			</td>
		</tr>
	);
});
const Dashboard = () => {
	return (
		<div className="flex flex-col gap-5 md:items-end md:justify-end">
			<div className="flex gap-5 flex-col justify-start  md:flex-row md:w-[75%] md:mr-[100px]">
				<div className="bg-green-500 md:w-1/4 py-[25px] text-white rounded-3xl shadow-xl">
					<div className="flex flex-col justify-start gap-[30px] ml-5 font-semibold">
						<div>
							<p className="font-semibold">Ventes (CA)</p>
						</div>
						<div className="flex justify-between">
							<div>
								<p>
									123<span className="ml-1">$</span>
								</p>
							</div>
							<div className="mr-[30px]">
								<ThemeIcon color={"#02e01f"} radius="xl" size="lg">
									<IconChecklist size={22} />
								</ThemeIcon>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-[#FFA616] md:w-1/4 py-[25px] text-white rounded-3xl shadow-xl">
					<div className="flex flex-col justify-start gap-[30px] ml-5 font-semibold">
						<div>
							<p className="font-semibold">Ventes (Nombres)</p>
						</div>
						<div className="flex justify-between">
							<div>
								<p>20</p>
							</div>
							<div className="mr-[30px]">
								<ThemeIcon color={"#fbbd57"} radius="xl" size="lg">
									<IconChecklist size={22} />
								</ThemeIcon>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-orange-400 md:w-1/4 py-[25px] text-white rounded-3xl shadow-xl">
					<div className="flex flex-col justify-start gap-[30px] ml-5 font-semibold">
						<div>
							<p className="font-semibold">Achats</p>
						</div>
						<div className="flex justify-between">
							<div>
								<p>
									2453<span className="ml-1">$</span>
								</p>
							</div>
							<div className="mr-[30px]">
								<ThemeIcon color={"#fda45b"} radius="xl" size="lg">
									<IconShoppingBag size={22} />
								</ThemeIcon>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-red-400 md:w-1/4 py-[25px] text-white rounded-3xl shadow-xl">
					<div className="flex flex-col justify-start gap-[30px] ml-5 font-semibold">
						<div>
							<p className="font-semibold">Taxes</p>
						</div>
						<div className="flex justify-between">
							<div>
								<p>
									90<span className="ml-1">$</span>
								</p>
							</div>
							<div className="mr-[30px]">
								<ThemeIcon color={"#ff847b"} radius="xl" size="lg">
									<IconReceipt size={22} />
								</ThemeIcon>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col md:flex-row gap-4 md:w-[75%] md:mr-[100px]">
				<div className="flex flex-col gap-3 md:w-1/2">
					<div className="w-full">
						<div className="bg-white py-[25px] text-black rounded-3xl shadow-xl">
							<div className="flex flex-col justify-start gap-[30px] ml-5 font-semibold">
								<div>
									<p className="font-semibold">Soldes en attente de virement</p>
								</div>
								<div className="flex justify-between">
									<div>
										<p>
											3453<span className="ml-1">$</span>
										</p>
									</div>
									<div className="mr-[30px]">
										<ThemeIcon color={"#a05bfd"} radius="xl" size="lg">
											<IconCurrencyEuro size={22} />
										</ThemeIcon>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex gap-5 w-full">
						<div className="bg-white w-1/2 py-[25px] text-black rounded-3xl shadow-xl">
							<div className="flex flex-col justify-start gap-[30px] ml-5 font-semibold">
								<div>
									<p className="font-semibold">Envois en attente</p>
								</div>
								<div className="flex justify-between">
									<div>
										<p>10</p>
									</div>
									<div className="mr-[30px]">
										<ThemeIcon color={"#5b73fd"} radius="xl" size="lg">
											<IconTruck size={22} />
										</ThemeIcon>
									</div>
								</div>
							</div>
						</div>
						<div className="bg-white w-1/2 py-[25px] text-black rounded-3xl shadow-xl">
							<div className="flex flex-col justify-start gap-[30px] ml-5 font-semibold">
								<div>
									<p className="font-semibold">Mes produits favoris</p>
								</div>
								<div className="flex justify-between">
									<div>
										<p>25</p>
									</div>
									<div className="mr-[30px]">
										<ThemeIcon color={"#5bdefd"} radius="xl" size="lg">
											<IconStar size={22} />
										</ThemeIcon>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex gap-5 w-full">
						<div className="bg-white w-1/2 py-[25px] text-black rounded-3xl shadow-xl">
							<div className="flex flex-col justify-start gap-[30px] ml-5 font-semibold">
								<div>
									<p className="font-semibold">Évaluations su jour</p>
								</div>
								<div className="flex justify-between">
									<div>
										<p>10</p>
									</div>
									<div className="mr-[30px]">
										<ThemeIcon color={"purple"} radius="xl" size="lg">
											<IconUser size={22} />
										</ThemeIcon>
									</div>
								</div>
							</div>
						</div>
						<div className="bg-white w-1/2 py-[25px] text-black rounded-3xl shadow-xl">
							<div className="flex flex-col justify-start gap-[30px] ml-5 font-semibold">
								<div>
									<p className="font-semibold">Fournisseur preferés</p>
								</div>
								<div className="flex justify-between">
									<div>
										<p>25</p>
									</div>
									<div className="mr-[30px]">
										<ThemeIcon color={"green"} radius="xl" size="lg">
											<IconStar size={22} />
										</ThemeIcon>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-white shadow-2xl rounded-xl px-4 py-4">
						<div className="flex gap-1 lg:justify-between mt-3 mb-3">
							<div className="mt-3">
								<p>Commandes recentes</p>
							</div>
							<Select
								classNames={{
									input:
										"rounded-2xl placeholder:font-bold border-green-600 border-2 shadow-xl",
								}}
								disabled={false}
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
									(""); // this actually works just need to update the ui
								}}
								data={[
									{ value: "archive", label: "Archiver" },
									{ value: "actif", label: "activer" },
									{ value: "inactif", label: "desactiver" },
								]}
							/>
							{/* <TextInput
								placeholder="Search by any field"
								classNames={{
									input: "rounded-2xl w-[200px] lg:w-[250px]",
								}}
								mb="md"
								icon={<IconSearch size={14} stroke={1.5} />}
								value={"search"}
								// onChange={}
								type="text"
							/> */}
						</div>
						{/* (
							<div className="flex justify-center">
								<LoadingOverlay
									visible
									loaderProps={{ size: "xl", color: "green", variant: "bars" }}
								/>
							</div>
						) : ( */}
						<div className="">
							<Table>
								<thead>
									<tr className="">
										{/* <th style={{ width: 40 }}>
												<Checkbox
													// onChange={toggleAll}
													// checked={selection.length === sellersData.length}
													indeterminate={
														false
														// selection.length > 0 &&
														// selection.length !== sellersData.length
													}
													transitionDuration={0}
												/>
											</th> */}
										<th className="">#</th>
										<th className="hidden md:table-cell">Date</th>
										<th className="">Prix</th>
										{/* <Th
												// sorted={sortBy === "nomEntreprise"}
												// reversed={reverseSortDirection}
												// onSort={() => setSorting("nomEntreprise")}
												tailwind={"hidden lg:table-cell"}
											> */}
										{/* <p className="">Société</p> */}
										{/* </Th> */}
										{/* <Th
												// sorted={sortBy === "pseudo"}
												// reversed={reverseSortDirection}
												// onSort={() => setSorting("pseudo")}
												// tailwind={"hidden md:table-cell"}
												tailwind={"hidden lg:table-cell"}
											>
												Pseudo
											</Th> */}
										{/* <Th
											// sorted={sortBy === "email"}
											// reversed={reverseSortDirection}
											// onSort={() => setSorting("email")}
											tailwind={"hidden lg:table-cell"}
											// tailwind={"hidden md:table-cell"}
										>
											E-mail
										</Th> */}
										{/* lg:table-cell */}
										{/* <th className="hidden lg:table-cell">Type</th>
											<th className="hidden lg:table-cell ">Type du compte</th>
											<th className="hidden lg:table-cell">Verifié</th> */}
										{/* <th className="hidden lg:table-cell ">enregistré le</th> */}
										<th className=" ">Statut</th>
										{/* <th>Actions</th> */}
									</tr>
								</thead>
								<tbody className="">{orders}</tbody>
							</Table>
						</div>
						{/* )} */}
					</div>
				</div>
				<div className="md:w-1/2">
					<FaqSimple />
				</div>
			</div>
			{/* <div className="flex gap-4 w-[75%] mr-[100px]">
				<div className="w-1/2"></div>
				<div className="w-1/2">lorem10</div>
			</div> */}
		</div>
	);
};

export default Dashboard;
