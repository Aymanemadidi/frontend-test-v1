import { ReactElement } from "react";
import NotLoggedLayout from "../components/notLoggedLayout";
import { Button } from "@mantine/core";
import { IconBuildingStore, IconShoppingCart } from "@tabler/icons";
import { useRouter } from "next/router";

export default function Inscription() {
	const router = useRouter();
	return (
		<div className="flex flex-col gap-2 items-center w-full">
			S'inscrire comme:
			<Button
				className="bg-green-500 w-[15%] min-w-[150px]"
				leftIcon={<IconBuildingStore size={20} />}
				onClick={() => router.push("/inscription-vendeur")}
			>
				Vendeur
			</Button>
			<Button
				className="bg-green-500 w-[15%] min-w-[150px]"
				leftIcon={<IconShoppingCart size={20} />}
				onClick={() => router.push("/inscription-acheteur")}
			>
				Acheteur
			</Button>
			<Button
				className="bg-green-500 w-[15%] min-w-[150px]"
				leftIcon={<IconShoppingCart size={20} />}
				rightIcon={<IconBuildingStore size={20} />}
				onClick={() => router.push("/inscription-vendeur-acheteur")}
			>
				Vendeur-Acheteur
			</Button>
		</div>
	);
}

Inscription.getLayout = (page: ReactElement) => {
	return <NotLoggedLayout>{page}</NotLoggedLayout>;
};
