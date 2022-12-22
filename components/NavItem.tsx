import React from "react";
import Link from "next/link";
import Image from "next/image";
import arrowIcon from "../public/arrow-icon.svg";
import arrowWhiteIcon from "../public/arrowWhite-icon.svg";
import arrowWhiteDownIcon from "../public/arrowWhiteDown-icon.svg";

import { Title, Box, Accordion } from "@mantine/core";

export function NavItem({ path, name, icon, opened }: any) {
	return (
		// <Link href={path} passHref>
		<Box className="flex justify-between items-center font-Montserrat">
			<div className="flex">
				<Image src={icon} alt="next" width={20} height={20} />
				<Title
					className={`${!opened ? "hidden" : ""} whitespace-nowrap`}
					order={5}
					ml={10}
				>
					{name}
				</Title>
			</div>
			<div className={`${!opened ? "hidden" : ""}`}>
				<Image src={arrowIcon} alt="next" width={5} height={5} />
			</div>
		</Box>
		// </Link>
	);
}

export function SelectedNavItem({ path, name, icon, gap, opened }: any) {
	return (
		<Link
			href={path}
			passHref
			className={`bg-green-600 py-5 px-2 translate-x-[-20px] ${
				opened ? "w-[285px]" : "w-[90px]"
			} transition-[width] duration-1000 rounded-br-[30px] rounded-tr-[30px]`}
		>
			<Box
				className={`flex justify-start gap-[${Number(
					gap
				)}px] items-center font-Montserrat ml-3`}
			>
				<div className="flex">
					<Image src={icon} alt="next" width={20} height={20} />
					<Title
						order={5}
						ml={10}
						className={`${
							!opened ? "hidden" : ""
						} text-white whitespace-nowrap`}
					>
						{name}
					</Title>
				</div>
				<div className={`${!opened ? "hidden" : ""}`}>
					<Image src={arrowWhiteDownIcon} alt="next" width={10} height={10} />
				</div>
			</Box>
		</Link>
	);
}
