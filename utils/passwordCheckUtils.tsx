import {
	NumberInput,
	TextInput,
	Button,
	PasswordInput,
	Popover,
	Group,
	Text,
	Center,
	Box,
	Progress,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";

export function PasswordRequirement({
	meets,
	label,
}: {
	meets: boolean;
	label: string;
}) {
	return (
		<Text color={meets ? "teal" : "red"} mt={5} size="sm">
			<Center inline>
				{meets ? (
					<IconCheck size={14} stroke={1.5} />
				) : (
					<IconX size={14} stroke={1.5} />
				)}
				<Box ml={7}>{label}</Box>
			</Center>
		</Text>
	);
}

export const requirements = [
	{ re: /[0-9]/, label: "Includes number" },
	{ re: /[a-z]/, label: "Includes lowercase letter" },
	{ re: /[A-Z]/, label: "Includes uppercase letter" },
	{ re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

export function getStrength(password: string) {
	let multiplier = password.length > 5 ? 0 : 1;

	requirements.forEach((requirement) => {
		if (!requirement.re.test(password)) {
			multiplier += 1;
		}
	});

	return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export const getchecks = (password: string) =>
	requirements.map((requirement, index) => (
		<PasswordRequirement
			key={index}
			label={requirement.label}
			meets={requirement.re.test(password)}
		/>
	));

export const getbars = (password: string, strength: any) =>
	Array(4)
		.fill(0)
		.map((_, index) => (
			<Progress
				styles={{ bar: { transitionDuration: "0ms" } }}
				value={
					password.length > 0 && index === 0
						? 100
						: strength >= ((index + 1) / 4) * 100
						? 100
						: 0
				}
				color={strength > 80 ? "teal" : strength > 50 ? "yellow" : "red"}
				key={index}
				size={4}
			/>
		));
