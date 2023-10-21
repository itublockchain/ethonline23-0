"use client"

import { UserContext } from "@/context"
import { use, useContext, useEffect, useState } from "react"
import { useWeb3Auth } from "./hooks"
import Image from "next/image"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
	const [loading, setLoading] = useState(true)

	const pathName = usePathname()

	const { user, connected } = useContext(UserContext) as IUserContext
	const { logout, login, web3AuthPack } = useWeb3Auth()

	const router = useRouter()

	useEffect(() => {
		if (web3AuthPack) {
			setLoading(false)
			if (connected) {
				console.log("connected")
				login()
			}
		}
	}, [web3AuthPack])

	useEffect(() => {
		if (user) {
			router.push("/games")
		}
	}, [user])

	const isMainPage = pathName === "/"

	return (
		<>
			{!isMainPage && (
				<div className="flex justify-between h-20 bg-jade-9 w-screen py-4 pr-12 pl-6">
					<Image src="/logo.png" alt="logo" width={80} height={50} />
					<div className="flex items-center justify-center gap-2">
						{!loading && (
							<Button
								variant="outline"
								onClick={() => {
									if (user) {
										logout()
									} else {
										login()
									}
								}}
							>
								{user ? "Logout" : "Login"}
							</Button>
						)}
					</div>
				</div>
			)}
		</>
	)
}

export default Navbar
