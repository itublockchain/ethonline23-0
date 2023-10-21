"use client"

import { UserContext, WalletContext } from "@/context"
import { useContext, useEffect } from "react"
import { useWeb3Auth } from "./hooks"
import { useToast } from "./ui/use-toast"
interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
	const { user, setUser } = useContext(UserContext) as IUserContext
	const { wallet, setWallet } = useContext(WalletContext) as IWalletContext
	const { web3AuthPack } = useWeb3Auth()
	const { toast } = useToast()

	const login = () => {
		if (!web3AuthPack) {
			return
		}
		web3AuthPack
			.signIn()
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
				web3AuthPack
					.getUserInfo()
					.then((userInfo) => {
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
		if (!web3AuthPack) {
			return
		}
		web3AuthPack
			.signOut()
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
			})
			.catch((err) => {
				toast({
					title: "Error",
					description: err.message,
					duration: 3000,
				})
			})
	}

	useEffect(() => {}, [])

	return <div></div>
}

export default Navbar
