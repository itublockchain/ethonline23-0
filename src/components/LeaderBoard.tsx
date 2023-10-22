"use client"

import { WalletContext } from "@/context"
import { use, useContext, useEffect, useState } from "react"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"

const leaders = [
	{ address: "0x184ba627DB853244c9f17f3Cb4378cB8B39bf147", score: 134 },
	{ address: "0x4123c277dfcBdDDC3585fDb10c0cEE3cE9BBBCf1", score: 83 },
	{ address: "0x0x1a4513887f935Db70026ce6e73CF65A079bbe2f31234", score: 1249 },
	{ address: "0x699C62B8188Fd3382117439173D5809C53B7F736", score: 7 },
]

export default function LeaderBoard() {
	const { wallet } = useContext(WalletContext) as IWalletContext
	const [bestScore, setBestScore] = useState("0")
	const address = wallet?.safes[0]

	useEffect(() => {
		setInterval(() => {
			const score = localStorage.getItem("bestScore")
			setBestScore(score || "0")
		}, 500)
	}, [address])

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Leaderboard</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Here is the current status of leaderboard</DialogTitle>
					<DialogDescription>
						{[...leaders, { address: address, score: Number(bestScore) }]
							.sort((a, b) => {
								return b.score - a.score
							})
							.map((leader) => (
								<div className="flex justify-between">
									<p>{leader.address}</p>
									<p>{leader.score}</p>
								</div>
							))}
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
