import {
	Container,
	Title,
	Accordion,
	createStyles,
	ThemeIcon,
} from "@mantine/core";
import { IconChevronDown, IconPlus } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
	wrapper: {
		// paddingTop: theme.spacing.xl * 2,
		// paddingBottom: theme.spacing.xl * 2,
		backgroundColor: "white",
		minHeight: 650,
	},

	title: {
		// marginBottom: theme.spacing.xl * 1.5,
	},

	item: {
		// borderRadius: theme.radius.md,
		// marginBottom: theme.spacing.lg,
		background: "transparent",

		// border: `1px solid ${
		// 	theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
		// }`,
	},
}));

const placeholder =
	"It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.";

export function FaqSimple() {
	const { classes } = useStyles();
	return (
		<div className="w-full flex flex-col gap-4">
			<div>
				<Container
					size="sm"
					className="bg-white shadow-xl rounded-2xl pt-[22px]  h-fit"
				>
					{/* <Title align="center" className={classes.title}> */}
					<Title align="start" className="text-[17px]">
						Taches
					</Title>

					<Accordion
						variant="separated"
						chevron={
							<ThemeIcon variant="light" color={"green"} radius="xl" size="sm">
								<IconChevronDown size={15} />
							</ThemeIcon>
						}
					>
						<div className="rounded-2xl flex flex-col">
							<Accordion.Item
								className="bg-white border-none"
								value="reset-password"
							>
								<Accordion.Control>Messages non lus</Accordion.Control>
								<Accordion.Panel>
									<button>test</button>
								</Accordion.Panel>
							</Accordion.Item>
							<Accordion.Item
								className="bg-white border-none translate-y-[-25px]"
								value="another-account"
							>
								<Accordion.Control>
									<div className="flex gap-3">
										<div>
											<p>Litiges a traiter</p>
										</div>
										<div>
											<ThemeIcon
												variant="filled"
												color={"red"}
												radius="xl"
												size="sm"
											>
												<p className="text-xs">3</p>
											</ThemeIcon>
										</div>
										{/* <div className="bg-red-500 px-2 py-1 rounded-[50%] text-xs text-white ">
									2
								</div> */}
									</div>
								</Accordion.Control>
								<Accordion.Panel>
									<button>test</button>
								</Accordion.Panel>
							</Accordion.Item>
						</div>
					</Accordion>
				</Container>
			</div>
			<div>
				<Container
					size="sm"
					className="bg-white shadow-xl rounded-2xl pt-[22px] h-fit"
				>
					{/* <Title align="center" className={classes.title}> */}
					<Title align="start" className="text-[17px]">
						Catalogues
					</Title>

					<Accordion
						variant="separated"
						chevron={
							<ThemeIcon variant="light" color={"green"} radius="xl" size="sm">
								<IconChevronDown size={15} />
							</ThemeIcon>
						}
					>
						<div className="rounded-2xl flex flex-col">
							<Accordion.Item
								className="bg-white border-none"
								value="reset-password"
							>
								<Accordion.Control>
									<div className="flex gap-3">
										<div>
											<p className="text-sm">
												Nombre de produits au catalogue (SKU)
											</p>
										</div>
										<div className="translate-y-[-3px]">
											<ThemeIcon
												variant="filled"
												color={"red"}
												radius="xl"
												size="sm"
												className="w-fit px-1"
											>
												<p className="text-xs">15</p>
											</ThemeIcon>
										</div>
										{/* <div className="bg-red-500 px-2 py-1 rounded-[50%] text-xs text-white ">
									2
								</div> */}
									</div>
								</Accordion.Control>
								<Accordion.Panel>
									<button>test</button>
								</Accordion.Panel>
							</Accordion.Item>
							<Accordion.Item
								className="bg-white border-none translate-y-[-25px]"
								value="fs"
							>
								<Accordion.Control>
									<div className="flex gap-3">
										<div>
											<p className="text-sm">
												Quantités de produits au catalogue
											</p>
										</div>
										<div className="translate-y-[-3px]">
											<ThemeIcon
												variant="filled"
												color={"red"}
												radius="xl"
												size="sm"
												className="w-fit px-1"
											>
												<p className="text-xs">15434</p>
											</ThemeIcon>
										</div>
										{/* <div className="bg-red-500 px-2 py-1 rounded-[50%] text-xs text-white ">
									2
								</div> */}
									</div>
								</Accordion.Control>
								<Accordion.Panel>
									<button>test</button>
								</Accordion.Panel>
							</Accordion.Item>
							<Accordion.Item
								className="bg-white border-none translate-y-[-45px]"
								value="fsdddd"
							>
								<Accordion.Control>
									<div className="flex gap-3">
										<div>
											<p className="text-sm">Valeur du stock</p>
										</div>
										<div className="translate-y-[-3px]">
											<ThemeIcon
												variant="filled"
												color={"red"}
												radius="xl"
												size="sm"
												className="w-fit px-1"
											>
												<p className="text-xs">5000000 $</p>
											</ThemeIcon>
										</div>
										{/* <div className="bg-red-500 px-2 py-1 rounded-[50%] text-xs text-white ">
									2
								</div> */}
									</div>
								</Accordion.Control>
								<Accordion.Panel>
									<button>test</button>
								</Accordion.Panel>
							</Accordion.Item>
							<Accordion.Item
								className="bg-white border-none translate-y-[-70px]"
								value="fsdd"
							>
								<Accordion.Control>
									<div className="flex gap-3">
										<div>
											<p className="text-sm">En cours de moderation</p>
										</div>
										<div className="translate-y-[-3px]">
											<ThemeIcon
												variant="filled"
												color={"red"}
												radius="xl"
												size="sm"
												className="w-fit px-1"
											>
												<p className="text-xs">15</p>
											</ThemeIcon>
										</div>
										{/* <div className="bg-red-500 px-2 py-1 rounded-[50%] text-xs text-white ">
									2
								</div> */}
									</div>
								</Accordion.Control>
								<Accordion.Panel>
									<button>test</button>
								</Accordion.Panel>
							</Accordion.Item>
							<Accordion.Item
								className="bg-white border-none translate-y-[-90px]"
								value="fsddddddas"
							>
								<Accordion.Control>
									<div className="flex gap-3">
										<div>
											<p className="text-sm">Brouillon</p>
										</div>
										<div className="translate-y-[-3px]">
											<ThemeIcon
												variant="filled"
												color={"red"}
												radius="xl"
												size="sm"
												className="w-fit px-1"
											>
												<p className="text-xs">15</p>
											</ThemeIcon>
										</div>
										{/* <div className="bg-red-500 px-2 py-1 rounded-[50%] text-xs text-white ">
									2
								</div> */}
									</div>
								</Accordion.Control>
								<Accordion.Panel>
									<button>test</button>
								</Accordion.Panel>
							</Accordion.Item>
							{/* <Accordion.Item
								className="bg-white border-none translate-y-[-25px]"
								value="fd"
							>
								<Accordion.Control>Messages non lusd</Accordion.Control>
								<Accordion.Panel>
									<button>f</button>
								</Accordion.Panel>
							</Accordion.Item> */}
						</div>
					</Accordion>
				</Container>
			</div>
		</div>
	);
}
