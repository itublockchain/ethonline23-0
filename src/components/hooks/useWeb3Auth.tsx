"use client"

import { use, useContext, useEffect, useState } from "react"
import {
	Web3AuthModalPack,
	Web3AuthConfig,
	Web3AuthEventListener,
} from "@safe-global/auth-kit"
import { Web3AuthOptions } from "@web3auth/modal"
import { OpenloginAdapter } from "@web3auth/openlogin-adapter"
import {
	ADAPTER_EVENTS,
	CHAIN_NAMESPACES,
	SafeEventEmitterProvider,
	WALLET_ADAPTERS,
} from "@web3auth/base"
import { clientConfig } from "@/config"
import { UserContext, WalletContext } from "@/context"
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/navigation"

// https://web3auth.io/docs/sdk/pnp/web/modal/initialize#arguments
const options: Web3AuthOptions = {
	clientId: clientConfig.WEB3_AUTH_CLIENT_ID,
	web3AuthNetwork: "testnet",
	chainConfig: {
		chainNamespace: CHAIN_NAMESPACES.EIP155,
		chainId: "0x5",
		// https://chainlist.org/
		rpcTarget: "https://rpc.ankr.com/eth_goerli",
	},
	uiConfig: {
		theme: "dark",
		loginMethodsOrder: ["google", "facebook"],
	},
}

// https://web3auth.io/docs/sdk/pnp/web/modal/initialize#configuring-adapters
const modalConfig = {
	[WALLET_ADAPTERS.METAMASK]: {
		label: "metamask",
		showOnDesktop: true,
		showOnMobile: false,
	},
}

// https://web3auth.io/docs/sdk/pnp/web/modal/whitelabel#whitelabeling-while-modal-initialization
const openloginAdapter = new OpenloginAdapter({
	loginSettings: {
		mfaLevel: "mandatory",
	},
	adapterSettings: {
		uxMode: "popup",
		whiteLabel: {
			name: "Safe",
		},
	},
})

const web3AuthConfig: Web3AuthConfig = {
	txServiceUrl: "https://safe-transaction-goerli.safe.global",
}

const connectedHandler: Web3AuthEventListener = (data) =>
	console.log("CONNECTED", data)
const disconnectedHandler: Web3AuthEventListener = (data) =>
	console.log("DISCONNECTED", data)
const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig)

function useWeb3Auth() {
	// Instantiate and initialize the pack
	const provider = web3AuthModalPack.getProvider() as SafeEventEmitterProvider
	const [loading, setLoading] = useState<boolean>(true)

	const { setUser } = useContext(UserContext) as IUserContext
	const { setWallet } = useContext(WalletContext) as IWalletContext

	const { toast } = useToast()

	const router = useRouter()

	const login = () => {
		web3AuthModalPack
			?.signIn()
			.then((wallets) => {
				setWallet(wallets as Wallet)
			})
			.catch((err) => {
				toast({
					title: "Error",
					description: err.message,
					duration: 3000,
				})
			})
			.then(() => {
				web3AuthModalPack
					.getUserInfo()
					.then((userInfo) => {
						console.log(userInfo)
						setUser(userInfo as User)
					})
					.catch((err) => {
						toast({
							title: "Error",
							description: err.message,
							duration: 3000,
						})
					})
			})
	}

	const logout = () => {
		web3AuthModalPack
			?.signOut()
			.then(() => {
				setWallet(null)
			})
			.catch((err) => {
				toast({
					title: "Error",
					description: err.message,
					duration: 3000,
				})
			})
			.then(() => {
				setUser(null)
				router.push("/")
			})
			.catch((err) => {
				toast({
					title: "Error",
					description: err.message,
					duration: 3000,
				})
			})
	}

	useEffect(() => {
		setLoading(true)

		web3AuthModalPack
			.init({
				options,
				adapters: [openloginAdapter],
				modalConfig,
			})
			.then(() => {
				web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler)
				web3AuthModalPack.subscribe(
					ADAPTER_EVENTS.DISCONNECTED,
					disconnectedHandler
				)
			})
			.catch((err) => {
				toast({
					title: "Error",
					description: err.message,
					duration: 3000,
				})
			})
			.finally(() => {
				setLoading(false)
			})
	}, [])

	useEffect(() => {
		console.log(loading)
	}, [loading])

	return { web3AuthModalPack, provider, login, logout, loading }
}

export default useWeb3Auth
