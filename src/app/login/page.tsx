"use client"
import { useWeb3Auth } from "@/components/hooks"
import { UserContext, WalletContext } from "@/context"
import { useContext, useEffect, useState } from "react"
import LoadingIndicator from "@/components/Loading"
import { ethers } from "ethers"
import Safe, {
	EthersAdapter,
	PredictedSafeProps,
	SafeAccountConfig,
	SafeDeploymentConfig,
	SafeFactory,
} from "@safe-global/protocol-kit"
import { clientConfig } from "@/config"
import SafeApiKit from "@safe-global/api-kit"
import { mintApeCoin, sendGoerliEther } from "@/lib/ethereum"
import { Stripe } from "@/components"

export default function Home() {
	const [safeDeploying, setSafeDeploying] = useState(false)
	const { login, loading, provider } = useWeb3Auth()
	const { user } = useContext(UserContext) as IUserContext
	const { wallet, addSafe } = useContext(WalletContext) as IWalletContext

	useEffect(() => {
		if (!wallet?.safes![0] && user) {
			setSafeDeploying(true)
			safe().then((res) => {
				addSafe(res)
				setSafeDeploying(false)
			})
		}
	}, [wallet])

	useEffect(() => {
		if (!loading && !user) {
			login()
		}
	}, [loading])

	const safe = async () => {
		const ethersProvider = new ethers.providers.Web3Provider(provider)
		console.log("provider", ethersProvider)
		const signer = ethersProvider.getSigner()
		console.log("signer", signer)
		const ethAdapter = new EthersAdapter({
			ethers,
			signerOrProvider: signer,
		})
		const eoaAddress = await signer.getAddress()
		const safeAccountConfig: SafeAccountConfig = {
			owners: [eoaAddress, clientConfig.ADDRESS],
			threshold: 1,
		}
		let saltNonce = window.localStorage.getItem("saltNonce")
		if (!saltNonce) {
			saltNonce = crypto.getRandomValues(new Uint8Array(8)).join("")
			window.localStorage.setItem("saltNonce", saltNonce)
		}
		const SafeDeploymentConfig: SafeDeploymentConfig = {
			saltNonce: saltNonce,
		}
		const predictedSafe: PredictedSafeProps = {
			safeAccountConfig: safeAccountConfig,
			safeDeploymentConfig: SafeDeploymentConfig,
		}
		const safeSdk: Safe = await Safe.create({ ethAdapter, predictedSafe })
		const safeAddress = await safeSdk.getAddress()

		const testing = await ethersProvider.getCode(safeAddress)
		console.log("testing", testing)
		console.log("safeAddress", safeAddress)
		const safeApiKit = new SafeApiKit({
			txServiceUrl: "https://safe-transaction-goerli.safe.global",
			ethAdapter,
		})
		if (testing == "0x") {
			await sendGoerliEther(eoaAddress)
			//TODO: CONTROL IT
			await mintApeCoin(safeAddress, "1000")
			console.log("100 APE Minted")

			const safeFactory = await SafeFactory.create({ ethAdapter })
			const safeSdk: Safe = await safeFactory.deploySafe({
				safeAccountConfig,
				saltNonce: saltNonce,
			})
			const newSafeAddress = await safeSdk.getAddress()
		}

		return safeAddress
	}

	return (
		<div className="w-full h-full bg-jade-8 min-h-screen">
			{safeDeploying && <LoadingIndicator width={320} height={320} />}

			{wallet?.safes![0] && <Stripe address={wallet?.safes[0]} />}
		</div>
	)
}
