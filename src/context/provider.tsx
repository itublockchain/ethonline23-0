import { Toaster } from "@/components/ui/toaster"
import UserProvider from "./userContext"
import WalletProvider from "./walletContext"

export default function ContextProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<WalletProvider>
			<UserProvider>
				{children}
				<Toaster />
			</UserProvider>
		</WalletProvider>
	)
}
