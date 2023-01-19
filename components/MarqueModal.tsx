import { useState } from "react";
import { Modal, Button, Group, TextInput } from "@mantine/core";

function MarqueModal({ openedModal }: any) {
	return (
		<>
			<Modal
				opened={openedModal}
				onClose={() => ""}
				title="Introduce yourself!"
			>
				<TextInput />
			</Modal>
		</>
	);
}

export default MarqueModal;
