"use client"
import { ExampleComponent } from "@/components"
import { Stripe } from "@/components"
import { useWeb3Auth } from "@/components/hooks"
import { UserContext, WalletContext } from "@/context"
import { useContext, useEffect, useState } from "react"

export default function Home() {
	const { login, loading } = useWeb3Auth()
	const { user } = useContext(UserContext) as IUserContext
	const { wallet } = useContext(WalletContext) as IWalletContext

	useEffect(() => {
		console.log(wallet)
	}, [wallet])

	useEffect(() => {
		if (!loading && !user) {
			login()
		}
	}, [loading])

	return (
		<div className="w-full h-full bg-jade-1 min-h-screen">
			<ExampleComponent />
			{wallet?.safes![0] && <Stripe address={wallet?.safes[0]} />}
		</div>
	)
}
