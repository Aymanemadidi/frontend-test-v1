import { Navbar, Group, Code, ScrollArea, createStyles } from "@mantine/core";
import {
	IconNotes,
	IconCalendarStats,
	IconGauge,
	IconPresentationAnalytics,
	IconFileAnalytics,
	IconAdjustments,
	IconLock,
	IconUsers,
	IconChecklist,
	IconClipboardList,
	IconMessage,
	IconFileAlert,
	IconPercentage,
	IconPhoto,
	IconCalculator,
	IconBook,
	IconTower,
} from "@tabler/icons";
import { UserButton } from "../components/UserButton";
import { LinksGroup } from "../components/NavbarLinksGroup";
// import { Logo } from "./Logo";

const mockdata = [
	{ label: "Dashboard", icon: IconGauge, link: "/tableau-de-bord" },
	{
		label: "Utilisateurs",
		icon: IconUsers,
		links: [
			{ label: "Tous", link: "/utilisateurs" },
			{ label: "Administrateurs", link: "/utilisateurs/administrateurs" },
			{ label: "Vendeurs", link: "/utilisateurs/vendeurs" },
			{ label: "Vendeurs Pro", link: "/utilisateurs/vendeurs/vendeursPro" },
			{ label: "Acheteurs", link: "/utilisateurs/acheteurs" },
			{ label: "Utilisateurs Archivés", link: "/utilisateurs/archives" },
		],
	},
	{
		label: "Mes commandes",
		icon: IconChecklist,
		links: [
			{ label: "Upcoming releases", link: "/utilisateurs" },
			{ label: "Previous releases", link: "/acheteurs" },
			{ label: "Releases schedule", link: "/vendeurs" },
		],
	},
	{
		label: "Administration",
		icon: IconTower,
		links: [
			{ label: "Marques", link: "/administration/marques" },
			{ label: "Types utilisateurs", link: "/administration/type-utilisateur" },
		],
	},
	{
		label: "Mes produits",
		icon: IconClipboardList,
	},
	{
		label: "Mes litiges",
		icon: IconFileAlert,
	},
	{
		label: "Mes comissions",
		icon: IconPercentage,
	},
	{
		label: "Librairie media",
		icon: IconPhoto,
	},
	{
		label: "Ma finance",
		icon: IconCalculator,
	},

	// { label: "Analytics", icon: IconPresentationAnalytics },
	// { label: "Contracts", icon: IconFileAnalytics },
	// { label: "Settings", icon: IconAdjustments },
];

const useStyles = createStyles((theme) => ({
	navbar: {
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
		paddingBottom: 0,
	},

	header: {
		padding: theme.spacing.md,
		paddingTop: 0,
		marginLeft: -theme.spacing.md,
		marginRight: -theme.spacing.md,
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
		borderBottom: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
	},

	links: {
		marginLeft: -theme.spacing.md,
		marginRight: -theme.spacing.md,
	},

	linksInner: {
		paddingTop: theme.spacing.xl,
		paddingBottom: theme.spacing.xl,
	},

	footer: {
		marginLeft: -theme.spacing.md,
		marginRight: -theme.spacing.md,
		borderTop: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
	},
}));

export function NavbarNested({ opened }: any) {
	const { classes } = useStyles();
	const links = mockdata.map((item) => (
		<LinksGroup {...item} key={item.label} openedSide={opened}></LinksGroup>
	));

	return (
		<Navbar
			p="md"
			hiddenBreakpoint="sm"
			hidden={!opened}
			// width={{ sm: 250 }}
			// className={`flex ${
			// 	opened ? "w-[250px]" : "w-[60px]"
			// } transition-[width] duration-1000`}
			className={`flex ${opened ? "w-[210px]" : "w-[60px]"} shadow-xl`}
			// sx={{ display: "flex", gap: "20px" }}
		>
			<Navbar.Section grow className={classes.links} component={ScrollArea}>
				<div className={classes.linksInner}>{links}</div>
			</Navbar.Section>
		</Navbar>
	);

	// return (
	// 	<div className={""}>
	// 		<Navbar
	// 			height={800}
	// 			width={{ sm: opened ? 200 : 60 }}
	// 			p="md"
	// 			// className={`${classes.navbar} pb-[130px] ${!opened ? "hidden" : ""}`}
	// 			className={`${classes.navbar} pb-[130px]`}
	// 		>
	// 			{/* <Navbar.Section className={classes.header}>
	// 			<Group position="apart">
	// 				<Logo width={120} />
	// 				<Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
	// 			</Group>
	// 		</Navbar.Section> */}

	// 			<Navbar.Section grow className={classes.links} component={ScrollArea}>
	// 				<div className={classes.linksInner}>{links}</div>
	// 			</Navbar.Section>
	// 		</Navbar>
	// 	</div>
	// );
}
