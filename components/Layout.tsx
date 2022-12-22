import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import {
	AppShell,
	Navbar,
	Header,
	Text,
	Title,
	Box,
	MediaQuery,
	Burger,
	Switch,
	Group,
	useMantineTheme,
	Accordion,
	NavLink,
} from "@mantine/core";
// import { IconSun, IconMoonStars } from "";
import { Home, DogBowl, Line } from "tabler-icons-react";
import { Dashboard } from "tabler-icons-react";
import dashboard from "../public/dashboard-icon.svg";
// import { Image } from "@mantine/core";
import bell from "../public/bell.svg";
import ordersIcon from "../public/orders-icon.svg";
import productsIcon from "../public/products-icon.svg";
import litigeIcon from "../public/litige-icon.svg";
import comissionIcon from "../public/comission-icon.svg";
import financeIcon from "../public/finance-icon.svg";
import promotionsIcon from "../public/promotions-icon.svg";
import favorisIcon from "../public/favoris-icon.svg";
import logoIcon from "../public/logo-icon.svg";
import burgerIcon from "../public/burger-icon.svg";
import searchIcon from "../public/search-icon.svg";
import messageIcon from "../public/message-icon.svg";
import settingsIcon from "../public/settings-icon.svg";
import lineIcon from "../public/line-icon.svg";
import profileIcon from "../public/profile-icon.svg";
import buyerIcon from "../public/buyer-icon.svg";
import sellerIcon from "../public/seller-icon.svg";
import mobileIcon from "../public/mobile-icon.png";
import arrowDownIcon from "../public/arrow-down-icon.svg";
import { NavItem, SelectedNavItem } from "./NavItem";
import Badge from "@mui/material/Badge";

import { motion } from "framer-motion";

export default function Layout({ children }: React.PropsWithChildren) {
	const theme = useMantineTheme();
	const [checked, setChecked] = useState(false);
	const [opened, setOpened] = useState(true);
	const [toggle, setToggle] = useState(false);
	const [numMessages, setNumMessages] = useState(0);
	const [numNotif, setNumNotif] = useState(0);
	const [width, setWidth] = useState(0);
	const title = opened ? "Close navigation" : "Open navigation";
	//#676C86
	useEffect(() => {
		// make sure your function is being called in client side only
		if (typeof window !== "undefined") {
			setWidth(window.innerWidth);
		}
	}, []);

	return (
		<div className="font-Montserrat">
			<Head>
				<title>Oregon Humane Adoptable Dogs</title>

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
						// hidden={!opened}
						// width={{ sm: 250 }}
						className={`flex gap-[20px] ${
							opened ? "w-[250px]" : "w-[60px]"
						} transition-[width] duration-1000`}
						// sx={{ display: "flex", gap: "20px" }}
					>
						<NavItem
							path="/server-side"
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
							gap={"80"}
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
						height={width > 1024 ? "90" : "150"}
						className="h-[150px] lg:h-[90px]"
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
								// justifyContent: "center",
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
										className=" hidden xl:block bg-none ml-5"
										alt="burger"
										color={theme.colors.gray[3]}
										src={lineIcon}
										height={33}
									/>
								</div>
								<div className="hidden lg:flex">
									<div className="">
										<input
											className=" bg-[#f1f1f1] py-3 w-[300px] rounded-3xl px-4 text-black"
											type="text"
											placeholder="Rechercher référence, mots clés ... "
										/>
									</div>
									<button onClick={() => console.log("click")}>
										<Image
											className="bg-none translate-x-[-35px] translate-y-[-5px]"
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
												height={33}
											/>
											<div
												className={`${
													numNotif === 0 ? "hidden" : ""
												}  text-sm bg-red-500 text-white rounded-[50%] text-center w-[20px] h-[20px] font-semibold translate-x-[-15px] translate-y-[5px]`}
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
												height={27}
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
												height={33}
											/>
											<div className="hidden md:block text-black">
												<span className="font-medium">Edgar Girerd</span>
												<br />
												<span className="text-xs">Vendeur professionnel</span>
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
											<div className="self-stretch">
												<Group position="center">
													<Switch
														size="xl"
														color={"green"}
														height={50}
														onClick={() => setToggle(!toggle)}
														onLabel={
															<Image
																className="bg-none"
																alt="burger"
																color={theme.colors.gray[3]}
																src={buyerIcon}
																height={23}
															/>
														}
														offLabel={
															<Image
																className="bg-none"
																alt="burger"
																color={theme.colors.gray[3]}
																src={sellerIcon}
																height={23}
															/>
														}
													/>
												</Group>
												<div className="text-black text-xs mt-1">
													Vue {!toggle ? "Vendeur" : "Acheteur"}
												</div>
											</div>
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
				<div className="mt-[20px]">{children}</div>
			</AppShell>
		</div>
	);
}

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