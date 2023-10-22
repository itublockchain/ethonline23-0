"use client"
import { useEffect, useState, useRef } from "react"
import { ethers } from "ethers"
import { Button } from "./ui/button"

import { StripeSession, StripePack } from "@safe-global/onramp-kit"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

const isSessionValid = (sessionId: string) => sessionId.length === 28

function Stripe({ address }: { address: string }) {
	const [walletAddress, setWalletAddress] = useState<string>(address)
	const [sessionId, setSessionId] = useState<string>("")
	const [stripePack, setStripePack] = useState<StripePack>()
	const stripeRootRef = useRef<HTMLDivElement>(null)

	const handleCreateSession = async () => {
		if (!isSessionValid(sessionId) && !ethers.utils.isAddress(walletAddress))
			return

		if (stripeRootRef.current) {
			stripeRootRef.current.innerHTML = ""
		}
		console.log("Creating session", sessionId)
		const sessionData = (await stripePack?.open({
			element: "#stripe-root",
			sessionId: sessionId,
			theme: "light",
			defaultOptions: {
				transaction_details: {
					wallet_address: walletAddress,
					supported_destination_networks: ["ethereum", "polygon"],
					supported_destination_currencies: ["usdc"],
					lock_wallet_address: true,
				},
				customer_information: {
					email: "john@doe.com",
				},
			},
		})) as StripeSession

		stripePack?.subscribe("onramp_ui_loaded", () => {
			console.log("UI loaded")
		})

		stripePack?.subscribe("onramp_session_updated", (e) => {
			console.log("Session Updated", e.payload)
		})

		setWalletAddress(sessionData?.transaction_details?.wallet_address || "")
	}

	useEffect(() => {
		;(async () => {
			const pack = new StripePack({
				stripePublicKey:
					"pk_test_51MZbmZKSn9ArdBimSyl5i8DqfcnlhyhJHD8bF2wKrGkpvNWyPvBAYtE211oHda0X3Ea1n4e9J9nh2JkpC7Sxm5a200Ug9ijfoO",
				onRampBackendUrl: "https://aa-stripe.safe.global",
			})

			await pack.init()

			setStripePack(pack)
		})()
	}, [])

	return (
		<div className="w-screen h-screen flex flex-col items-center justify-center">
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="default" onClick={handleCreateSession}>
						Fund your safe account
					</Button>
				</DialogTrigger>
				<DialogContent className="text-white">
					<DialogHeader>
						<DialogTitle>Send USDC to your safe account</DialogTitle>
						<DialogDescription>
							<div id="stripe-root" ref={stripeRootRef}></div>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default Stripe
