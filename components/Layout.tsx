import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import {
	AppShell,
	Navbar,
	Header,
	Burger,
	useMantineTheme,
	Menu,
} from "@mantine/core";
import {
	IconSettings,
	IconUserCircle,
	IconSignRight,
	IconShoppingBag,
	IconBuildingStore,
	IconLogout,
} from "@tabler/icons";

import dashboard from "../public/dashboard-icon.svg";
import bell from "../public/bell.svg";
import ordersIcon from "../public/orders-icon.svg";
import productsIcon from "../public/products-icon.svg";
import litigeIcon from "../public/litige-icon.svg";
import comissionIcon from "../public/comission-icon.svg";
import financeIcon from "../public/finance-icon.svg";
import promotionsIcon from "../public/promotions-icon.svg";
import favorisIcon from "../public/favoris-icon.svg";
import logoIcon from "../public/logo-icon.svg";
import searchIcon from "../public/search-icon.svg";
import messageIcon from "../public/message-icon.svg";
import lineIcon from "../public/line-icon.svg";
import profileIcon from "../public/profile-icon.svg";
import arrowDownIcon from "../public/arrow-down-icon.svg";
import { NavItem, SelectedNavItem } from "./NavItem";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function Layout({ children, access_token }: any) {
	const theme = useMantineTheme();
	const [checked, setChecked] = useState(false);
	const [opened, setOpened] = useState(false);
	const [toggle, setToggle] = useState(false);
	const [numMessages, setNumMessages] = useState(3);
	const [numNotif, setNumNotif] = useState(2);
	const [width, setWidth] = useState(0);
	const [user, setUser] = useState<any>({
		getMe: {
			firstName: "",
			lastName: "",
			role: "",
		},
	});
	const title = opened ? "Close navigation" : "Open navigation";
	const [_id, setId] = useState<any>("");
	const router = useRouter();

	useEffect(() => {
		// make sure your function is being called in client side only
		if (typeof window !== "undefined") {
			setWidth(window.innerWidth);
		}
	}, []);

	function addPropsToReactElement(element: any, props: any) {
		if (React.isValidElement(element)) {
			return React.cloneElement(element, props);
		}
		return element;
	}

	function addPropsToChildren(children: any, props: any) {
		if (!Array.isArray(children)) {
			return addPropsToReactElement(children, props);
		}
		return children.map((childElement) =>
			addPropsToReactElement(childElement, props)
		);
	}

	const GET_ME = gql`
		query getMe {
			getMe {
				firstName
				lastName
				role
			}
		}
	`;

	const LOGOUT_USER = gql`
		mutation logoutUser {
			logoutUser
		}
	`;
	const [logout, logoutResults] = useMutation(LOGOUT_USER);
	const { error, loading, data } = useQuery(GET_ME, {
		onCompleted: setUser,
		fetchPolicy: "no-cache",
	});

	if (loading) {
		return (
			<div className="flex justify-center">
				{/* <LoadingOverlay visible />; */}
			</div>
		);
	}
	if (error) {
		// logout();
		router.push("/login");
		// return <div>{error.message}</div>;
	}
	if (data) {
		console.log("getMe: ", data);
	}

	if (logoutResults.loading) {
		return <div className="flex justify-center"></div>;
	}

	if (logoutResults.error) {
		<div>{logoutResults.error.message}</div>;
	}

	if (logoutResults.data) {
		// window.localStorage.removeItem("id");
		router.push("/login");
	}

	console.log(user);
	return (
		<div className="font-Montserrat">
			<Head>
				<title>Spare Place</title>

				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<AppShell
				className="font-thin shadow-xl"
				padding="md"
				navbarOffsetBreakpoint="sm"
				fixed
				navbar={
					<Navbar
						p="md"
						hiddenBreakpoint="sm"
						hidden={!opened}
						// width={{ sm: 250 }}
						// className={`flex ${
						// 	opened ? "w-[250px]" : "w-[60px]"
						// } transition-[width] duration-1000`}
						className={`flex ${opened ? "w-[200px]" : "w-[60px]"}`}
						// sx={{ display: "flex", gap: "20px" }}
					>
						<NavItem
							path="/all-sellers"
							name="Tableau de bord"
							icon={dashboard}
							opened={opened}
						/>
						<NavItem
							path="/client-side"
							name="Mes commandes"
							icon={ordersIcon}
							opened={opened}
						/>
						<SelectedNavItem
							path="/"
							name="Mes produits"
							icon={productsIcon}
							gap={"20"}
							opened={opened}
						/>
						<NavItem
							path="/server-side"
							name="Mes litiges"
							icon={litigeIcon}
							opened={opened}
						/>
						<NavItem
							path="/client-side"
							name="Mes commissions"
							icon={comissionIcon}
							opened={opened}
						/>
						<NavItem
							path="/"
							name="Ma finance"
							icon={financeIcon}
							opened={opened}
						/>
						<NavItem
							path="/"
							name="Mes promotions"
							icon={promotionsIcon}
							opened={opened}
						/>
						<NavItem
							path="/"
							name="Mes favoris"
							icon={favorisIcon}
							opened={opened}
						/>
					</Navbar>
				}
				header={
					<Header
						height={width > 1024 ? "73" : "150"}
						className="h-[150px] lg:h-[73px]"
						p="lg"
						sx={(theme) => ({
							backgroundColor: theme.colors.white,
							color: "white",
						})}
					>
						<div
							style={{
								display: "flex",
								// alignItems: "center",
								justifyContent: "center",
								height: "100%",
								width: "100%",
								gap: "10px",
							}}
							className="flex-col"
						>
							{/* <MediaQuery largerThan="sm" styles={{ display: "none" }}> */}
							<div className="flex justify-between">
								<div className="flex">
									<Burger
										className="mt-2"
										opened={opened}
										onClick={() => setOpened((o) => !o)}
										title={title}
									/>
									{/* <Image
										onClick={() => setOpened((o) => !o)}
										alt="burger"
										color={theme.colors.gray[3]}
										src={burgerIcon}
										height={20}
									/> */}
									<Link className="ml-5 mt-4 text-black" href="/" passHref>
										<Image
											className="hidden xl:block"
											src={logoIcon}
											alt="next"
											width={230}
											height={230}
										/>
										{/* <Image
											className="xl:hidden translate-x-[-10px] -translate-y-1 ml-5"
											src={mobileIcon}
											alt="next"
											width={40}
											height={40}
										/> */}
										{/* <p className="md:hidden">S-P</p> */}
									</Link>
									<Image
										className="hidden mt-3 xl:block bg-none ml-5 translate-y-[-8px]"
										alt="burger"
										color={theme.colors.gray[3]}
										src={lineIcon}
										height={33}
									/>
								</div>
								<div className="hidden lg:flex mt-1">
									<div className="">
										<input
											className=" bg-[#f1f1f1] py-3 w-[600px] rounded-3xl px-4 text-black"
											type="text"
											placeholder="Rechercher référence, mots clés ... "
										/>
									</div>
									<button onClick={() => console.log("click")}>
										<Image
											className="bg-none translate-x-[-35px] translate-y-[-2px]"
											alt="burger"
											color={theme.colors.gray[3]}
											src={searchIcon}
											height={20}
										/>
									</button>
								</div>
								<div className="flex">
									{/* <div className="flex">
										<Image
											className="bg-none translate-x-[-35px]"
											alt="burger"
											color={theme.colors.gray[3]}
											src={bell}
											height={33}
										/>
										<div className="text-sm bg-red-500 text-white rounded-[50%] text-center w-[20px] h-[20px] font-semibold translate-x-[-50px] translate-y-[-5px]">
											5
										</div> */}
									{/* <Image
											className="bg-none translate-x-[-35px]"
											alt="burger"
											color={theme.colors.gray[3]}
											src={messageIcon}
											height={27}
										/>
									</div>

									<div className="text-sm bg-red-500 text-white rounded-[50%] text-center w-[20px] h-[20px] font-semibold translate-x-[-50px] translate-y-[-5px]">
										3
									</div> */}
									<div
										className={`flex justify-around ${
											numNotif === 0 ? "gap-5" : ""
										}`}
									>
										<div className="flex">
											<Image
												className="bg-none"
												alt="burger"
												color={theme.colors.gray[3]}
												src={bell}
												height={25}
											/>
											<div
												className={`${
													numNotif === 0 ? "hidden" : ""
												}  text-sm bg-red-500 text-white rounded-[50%] text-center w-[20px] h-[20px] font-semibold translate-x-[-12px] translate-y-[5px]`}
											>
												{numNotif}
											</div>
										</div>
										<div className="flex">
											<Image
												className={`bg-none ${numMessages === 0 ? "mr-4" : ""}`}
												alt="burger"
												color={theme.colors.gray[3]}
												src={messageIcon}
												height={20}
											/>
											<div
												className={`${
													numMessages === 0 ? "hidden" : ""
												}  text-sm bg-red-500 text-white rounded-[50%] text-center w-[20px] h-[20px] font-semibold translate-x-[-10px] translate-y-[6px]`}
											>
												{numMessages}
											</div>
										</div>
										{/* <Image
											className="bg-none hidden lg:block mr-4"
											alt="burger"
											color={theme.colors.gray[3]}
											src={settingsIcon}
											height={30}
										/> */}

										<div className="flex gap-4">
											{/* <Image
												className="bg-none"
												alt="burger"
												color={theme.colors.gray[3]}
												src={lineIcon}
												height={33}
											/>
											<Image
												className="bg-none"
												alt="burger"
												color={theme.colors.gray[3]}
												src={profileIcon}
												height={27}
											/>
											<div className="hidden md:block text-black">
												<span className="font-medium text-sm">
													{`${user.getMe.firstName} ${user.getMe.lastName}`}
												</span>
												<br />
												<span className="text-sm">{user.getMe.role}</span>
											</div>
											<Image
												className="bg-none"
												alt="burger"
												color={theme.colors.gray[3]}
												src={arrowDownIcon}
												height={5}
											/>
											<Image
												className="bg-none"
												alt="burger"
												color={theme.colors.gray[3]}
												src={lineIcon}
												height={33}
											/> */}
											<div className="cursor-pointer">
												<Menu
													shadow="md"
													width={200}
													// transition="pop"
													// transitionDuration={150}
												>
													<Menu.Target>
														<div className="flex gap-3 hover:bg-zinc-50">
															<Image
																className="bg-none"
																alt="burger"
																color={theme.colors.gray[3]}
																src={lineIcon}
																height={33}
															/>
															<Image
																className="bg-none"
																alt="burger"
																color={theme.colors.gray[3]}
																src={profileIcon}
																height={27}
															/>
															<div className="hidden md:block text-black">
																<span className="font-medium text-sm">
																	{`${user.getMe.firstName} ${user.getMe.lastName}`}
																</span>
																<br />
																<span className="text-sm">
																	{user.getMe.role}
																</span>
															</div>
															<Image
																className="bg-none"
																alt="burger"
																color={theme.colors.gray[3]}
																src={arrowDownIcon}
																height={5}
															/>
															<Image
																className="bg-none"
																alt="burger"
																color={theme.colors.gray[3]}
																src={lineIcon}
																height={33}
															/>
														</div>
													</Menu.Target>

													<Menu.Dropdown>
														<Menu.Label>
															Bonjour{" "}
															{user.getMe.firstName.charAt(0).toUpperCase(0) +
																user.getMe.firstName.slice(1)}
														</Menu.Label>
														<Menu.Item icon={<IconUserCircle size={14} />}>
															Mon compte
														</Menu.Item>
														<Menu.Item icon={<IconSignRight size={14} />}>
															Mes ventes
														</Menu.Item>
														<Menu.Item icon={<IconShoppingBag size={14} />}>
															Mes achats
														</Menu.Item>
														<Menu.Item icon={<IconSettings size={14} />}>
															Settings
														</Menu.Item>
														<Menu.Item icon={<IconBuildingStore size={14} />}>
															Ma boutique
														</Menu.Item>
														<Menu.Item
															icon={<IconLogout size={14} />}
															// rightSection={
															// 	<Text size="xs" color="dimmed">
															// 		⌘K
															// 	</Text>
															// }
															onClick={() => logout()}
														>
															Se deconnecter
														</Menu.Item>

														{/* <Menu.Divider />

														<Menu.Label>Danger zone</Menu.Label>
														<Menu.Item icon={<IconArrowsLeftRight size={14} />}>
															Transfer my data
														</Menu.Item>
														<Menu.Item
															color="red"
															icon={<IconTrash size={14} />}
														>
															Delete my account
														</Menu.Item> */}
													</Menu.Dropdown>
												</Menu>
											</div>
											<div>
												{/* <button
													className="bg-green-600 px-6 py-2 rounded-2xl font-Montserrat font-thin"
													onClick={() => logout()}
												>
													logout
												</button> */}
											</div>
											{/* <div className="self-stretch">
												<Group position="center">
													<Switch
														size="xl"
														color={"green"}
														height={20}
														onClick={() => setToggle(!toggle)}
														onLabel={
															<Image
																className="bg-none"
																alt="burger"
																color={theme.colors.gray[3]}
																src={buyerIcon}
																height={20}
															/>
														}
														offLabel={
															<Image
																className="bg-none"
																alt="burger"
																color={theme.colors.gray[3]}
																src={sellerIcon}
																height={20}
															/>
														}
													/>
												</Group>
												<div className="text-black text-xs mt-1">
													Vue {!toggle ? "Vendeur" : "Acheteur"}
												</div>
											</div> */}
											{/* <div className="flex justify-between bg-green-500 rounded-3xl gap-4 pr-1 pl-1 py-1">
												<Image
													className={`p-[8px] w-[40px] h-[40px] ${
														toggle ? "bg-green-900 rounded-[50%]" : ""
													}`}
													onClick={() => setToggle(true)}
													// className="bg-green-900 rounded-[50%] w-[40px] h-[40px] p-[8px]"
													alt="burger"
													// color={theme.colors.gray[3]}
													src={buyerIcon}
													height={20}
												/>
												<Image
													className={`w-[40px] h-[40px] p-[5px] ${
														!toggle ? "bg-white rounded-[50%] shadow-lg" : ""
													}`}
													onClick={() => setToggle(false)}
													alt="burger"
													// color={theme.colors.gray[3]}
													src={sellerIcon}
													height={30}
												/>
											</div> */}
										</div>
										{/* <div className="text-sm bg-red-500 text-white rounded-[50%] text-center w-[20px] h-[20px] font-semibold translate-x-[-50px] translate-y-[-5px]">
											3
										</div> */}
									</div>
									{/* <Group position="center">
										<Switch
											checked={checked}
											onChange={(event) =>
												setChecked(event.currentTarget.checked)
											}
											color="teal"
											size="md"
											label="Switch with thumb icon"
											thumbIcon={
												checked ? (
													<Image
														// hidden={!opened}
														// size="sm"
														className="bg-none"
														alt="burger"
														color={theme.colors.gray[3]}
														src={arrowDownIcon}
														height={5}
														// mr="xl"
													/>
												) : (
													<Image
														// hidden={!opened}
														// size="sm"
														className="bg-none"
														alt="burger"
														color={theme.colors.gray[3]}
														src={bell}
														height={5}
														// mr="xl"
													/>
												)
											}
										/>
									</Group> */}
								</div>
							</div>
							<div className="flex justify-center w-full lg:hidden">
								<div className="">
									<input
										className=" bg-[#f1f1f1] py-3 w-[300px] rounded-3xl px-4 text-black"
										type="text"
										placeholder="Rechercher référence, mots clés ... "
									/>
								</div>
								<button onClick={() => console.log("click")}>
									<Image
										// hidden={!opened}
										// size="sm"
										className="bg-none translate-x-[-35px]"
										alt="burger"
										color={theme.colors.gray[3]}
										src={searchIcon}
										height={20}
										// mr="xl"
									/>
								</button>
							</div>
						</div>
					</Header>
				}
				styles={(theme) => ({
					main: {
						backgroundColor: theme.colors.gray[0],
					},
				})}
			>
				{/* <div className="mt-[20px]">{children}</div> */}
				<div className="mt-[20px]">
					{addPropsToChildren(children, { opened })}
				</div>
			</AppShell>
		</div>
	);
}

// export async function getServerSideProps() {
// 	return {
// 		props: {},
// 	};
// }

/* background-color: red; color: white; text-align: center;
										width: 17px; height: 20px; border: none; border-radius: 50%;
										font-weight: 500; transform: translate(-45px,-5px); /*
										transform: translateY(10px);
										
										
										
										
										
										
										
element.style {
    width: 40px;
    height: 40px;
    padding: 5px;
    color: transparent;
}
										
										*/
