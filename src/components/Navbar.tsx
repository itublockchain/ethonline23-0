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
	const pathName = usePathname()

	const { user, connected } = useContext(UserContext) as IUserContext
	const { logout, login, loading } = useWeb3Auth()

	const router = useRouter()

	useEffect(() => {
		console.log(loading)
		if (connected) {
			console.log("connected")
			login()
		}
	}, [loading])

	const isMainPage = pathName === "/"

	return (
		<>
			{!isMainPage && (
				<div className="flex justify-between h-20 bg-jade-9 w-screen py-4 pr-12 pl-6 fixed top-0 z-10">
					<Image
						src="/logo.png"
						alt="logo"
						width={60}
						height={60}
						onClick={() => {
							router.push("/")
						}}
					/>
					<div className="flex items-center justify-center gap-2">
						<Button
							variant="link"
							onClick={() => {
								router.push("/market")
							}}
						>
							Market
						</Button>

						<Button
							variant="link"
							onClick={() => {
								router.push("/games")
							}}
						>
							Games
						</Button>

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
					</div>
				</div>
			)}
		</>
	)
}

export default Navbar
