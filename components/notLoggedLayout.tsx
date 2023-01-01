import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import { AppShell, Header, Burger, useMantineTheme } from "@mantine/core";
import logoIcon from "../public/logo-icon.svg";
import searchIcon from "../public/search-icon.svg";
import lineIcon from "../public/line-icon.svg";
import profileIcon from "../public/profile-icon.svg";

export default function NotLoggedLayout({ children }: React.PropsWithChildren) {
	const theme = useMantineTheme();
	const [checked, setChecked] = useState(false);
	const [opened, setOpened] = useState(true);
	const [toggle, setToggle] = useState(false);
	const [numNotif, setNumNotif] = useState(2);
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
				<title>Spare Place</title>

				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<AppShell
				className="font-thin shadow-xl"
				padding="md"
				navbarOffsetBreakpoint="sm"
				fixed
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
							<div className="flex justify-between">
								<div className="flex">
									<Burger className="mt-2" opened={false} title={title} />
									<Link className="ml-5 mt-4 text-black" href="/" passHref>
										<Image
											className="hidden xl:block"
											src={logoIcon}
											alt="next"
											width={230}
											height={230}
										/>
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
									<div
										className={`flex justify-around ${
											numNotif === 0 ? "gap-5" : ""
										}`}
									>
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
												height={27}
											/>
										</div>
									</div>
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
