import { useState } from "react";
import {
	Group,
	Box,
	Collapse,
	ThemeIcon,
	Text,
	UnstyledButton,
	createStyles,
} from "@mantine/core";
import {
	TablerIcon,
	IconCalendarStats,
	IconChevronLeft,
	IconChevronRight,
} from "@tabler/icons";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
	control: {
		fontWeight: 500,
		display: "block",
		width: "100%",
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
		color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
		fontSize: theme.fontSizes.sm,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[7]
					: theme.colors.gray[0],
			color: theme.colorScheme === "dark" ? theme.white : theme.black,
		},
	},

	link: {
		fontWeight: 500,
		display: "block",
		textDecoration: "none",
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
		paddingLeft: 31,
		marginLeft: 30,
		fontSize: theme.fontSizes.sm,
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		borderLeft: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[7]
					: theme.colors.gray[0],
			color: theme.colorScheme === "dark" ? theme.white : theme.black,
		},
	},

	chevron: {
		transition: "transform 200ms ease",
	},
}));

interface LinksGroupProps {
	icon: TablerIcon;
	label: string;
	initiallyOpened?: boolean;
	links?: { label: string; link: string }[];
}

export function LinksGroup({
	icon: Icon,
	label,
	initiallyOpened,
	links,
	openedSide,
}: any) {
	const { classes, theme } = useStyles();
	const hasLinks = Array.isArray(links);
	const [opened, setOpened] = useState(initiallyOpened || false);
	const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
	const items = (hasLinks ? links : []).map((link) => (
		<Link
			className={`${classes.link}`}
			href={link.link}
			key={link.label}
			onClick={(event) => console.log("clicked link")}
		>
			{link.label}
		</Link>
	));

	return (
		// <Link href={label === "Dashboard" ? "/dashboard": ""}>
		<Link href={label === "Dashboard" ? "/tableau-de-bord" : "#"}>
			<UnstyledButton
				onClick={() => setOpened((o: any) => !o)}
				className={classes.control}
			>
				<Group position="apart" spacing={0}>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<ThemeIcon variant="light" color={"gray"} size={30}>
							<Icon size={22} color="green" />
						</ThemeIcon>
						{openedSide && (
							<Box ml="sm" className="text-[15px]">
								{label}
							</Box>
						)}
					</Box>
					{hasLinks && openedSide && (
						<ChevronIcon
							className={classes.chevron}
							size={14}
							stroke={1.5}
							style={{
								transform: opened
									? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
									: "none",
							}}
						/>
					)}
				</Group>
			</UnstyledButton>
			{hasLinks && openedSide ? <Collapse in={opened}>{items}</Collapse> : null}
		</Link>
	);
}

const mockdata = {
	label: "Releases",
	icon: IconCalendarStats,
	links: [
		{ label: "Upcoming releases", link: "/" },
		{ label: "Previous releases", link: "/" },
		{ label: "Releases schedule", link: "/" },
	],
};

export function NavbarLinksGroup() {
	return (
		<Box
			sx={(theme) => ({
				minHeight: 220,
				padding: theme.spacing.md,
				backgroundColor:
					theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
			})}
		>
			<LinksGroup {...mockdata} />
		</Box>
	);
}
