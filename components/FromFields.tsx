import {
	Group,
	PasswordInput,
	Popover,
	Select,
	TextInput,
	Tooltip,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconBell } from "@tabler/icons";
import "dayjs/locale/fr";
import { PasswordRequirement } from "../utils/passwordCheckUtils";
import PhoneInput from "react-phone-input-2";

export function FormTextField({
	pField,
	placeholderField,
	tooltipMessage,
	form,
	formInput,
}: any) {
	return (
		<TextInput
			classNames={{
				root: "pl-3 pr-3 w-full",
				wrapper: "w-full",
				input:
					"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1",
				label: "ml-2 flex",
			}}
			label={
				<div className="flex gap-1">
					<p className="">{pField}</p>
					<Tooltip className="" label={tooltipMessage}>
						<div>
							<IconBell size={15} />
						</div>
					</Tooltip>
				</div>
			}
			radius={25}
			mt="sm"
			placeholder={placeholderField}
			withAsterisk
			// value={null}
			{...form.getInputProps(formInput)}
		/>
	);
}

export function FormSelectField({
	labelField,
	placeholderField,
	form,
	dataArr,
	formInput,
	isType,
	setTypeId,
}: any) {
	if (isType) {
		return (
			<Select
				label="Type compte"
				searchable
				nothingFound="No options"
				classNames={{
					input:
						"rounded-2xl font-normal placeholder:font-thin placeholder:text-gray-600 border-slate-200 mt-1",
					label: "ml-1",
				}}
				className="ml-3 mt-3 flex flex-col gap-1 justify-start items-start"
				maxDropdownHeight={280}
				withAsterisk
				data={dataArr}
				defaultValue={"63c8092dfe9bcce12f8d7785"}
				onChange={(e: any) => setTypeId(e)}
				placeholder="Type de votre compte"
			/>
		);
	}
	return (
		<Select
			label={labelField}
			searchable
			nothingFound="No options"
			classNames={{
				input:
					"rounded-2xl font-normal placeholder:font-thin placeholder:text-gray-600 border-slate-200 mt-1",
				label: "ml-1",
			}}
			className="ml-3 mt-3 flex flex-col gap-1 justify-start items-start"
			maxDropdownHeight={280}
			withAsterisk
			data={dataArr}
			placeholder={placeholderField}
			{...form.getInputProps(formInput)}
		/>
	);
}

export function FormDateField({
	labelField,
	placeholderField,
	form,
	dataArr,
	formInput,
}: any) {
	return (
		<DatePicker
			placeholder={placeholderField}
			locale="fr"
			classNames={{
				input:
					"rounded-2xl font-normal placeholder:font-thin placeholder:text-gray-600 border-slate-200 mt-1",
				label: "ml-1",
			}}
			className="ml-3 mt-3 flex flex-col gap-1 justify-start items-start"
			label={labelField}
			withAsterisk
			{...form.getInputProps(formInput)}
		/>
	);
}

export function PasswordField({
	opened,
	setOpened,
	password,
	setPassword,
	strength,
	bars,
	checks,
}: any) {
	return (
		<Popover opened={opened} onChange={setOpened}>
			<Popover.Target>
				<PasswordInput
					value={password}
					onChange={(e: any) => setPassword(e.target.value)}
					placeholder="Votre mot de passe"
					label="Mot de passe"
					error={strength < 100}
					classNames={{
						root: "pl-3 pr-3 w-full",
						wrapper: "w-full",
						input:
							"w-full font-semibold placeholder:font-normal placeholder:text-gray-400 border-slate-200 mt-1 rounded-2xl",
						label: "ml-2",
					}}
					onFocusCapture={() => setOpened((o: any) => !o)}
					// {...form.getInputProps("password")}
				/>
			</Popover.Target>
			<Popover.Dropdown>
				<div className="m-auto">
					<Group spacing={5} grow mt="xs" mb="md">
						{bars}
					</Group>

					<PasswordRequirement
						label="Has at least 6 characters"
						meets={password.length > 5}
					/>
					{checks}
				</div>
			</Popover.Dropdown>
		</Popover>
	);
}

export function PhoneField({ form, formInput, pField }: any) {
	return (
		<div className="flex flex-col ml-3 mt-3">
			<p className="text-base font-Montserrat font-normal">{pField}</p>
			<PhoneInput
				country={"fr"}
				containerClass="mt-3"
				inputClass="h-[20px] rounded-2xl"
				inputStyle={{ borderRadius: "30px" }}
				specialLabel=""
				{...form.getInputProps(formInput)}
				// value={this.state.phone}
				// onChange={(phone) => this.setState({ phone })}
			/>
		</div>
	);
}
