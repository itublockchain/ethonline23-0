import * as React from "react"

export const WalletContext = React.createContext<IWalletContext | null>(null)

const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [wallet, setWallet] = React.useState<Wallet | null>(null)

	React.useEffect(() => {
		setWallet(
			window.localStorage.getItem("wallets")
				? JSON.parse(localStorage.getItem("wallets") as string)
				: null
		)
	}, [])

	function addSafe(safe: string) {
		if (!wallet) return
		const newWallet = { ...wallet }
		newWallet.safes?.push(safe)
		setWallet(newWallet)
	}

	return (
		<WalletContext.Provider
			value={{
				wallet,
				setWallet,
				addSafe,
			}}
		>
			{children}
		</WalletContext.Provider>
	)
}

export default WalletProvider
