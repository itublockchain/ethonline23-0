"use client"

import { useEffect, useState } from "react"
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

interface NavbarProps {}

function useWeb3Auth() {
	// Instantiate and initialize the pack
	const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig)
	const provider = web3AuthModalPack.getProvider() as SafeEventEmitterProvider
	const [web3AuthPack, setWeb3AuthPack] = useState<Web3AuthModalPack | null>()

	useEffect(() => {
		const init = async () => {
			await web3AuthModalPack.init({
				options,
				adapters: [openloginAdapter],
				modalConfig,
			})
		}
		init().then(() => {
			web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler)
			web3AuthModalPack.subscribe(
				ADAPTER_EVENTS.DISCONNECTED,
				disconnectedHandler
			)
			setWeb3AuthPack(web3AuthModalPack)
		})
	}, [])

	return { web3AuthPack, provider }
}

export default useWeb3Auth
