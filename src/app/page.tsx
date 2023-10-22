"use client"
import Image from "next/image"
import logo from "../../public/logo.png"
import { Button } from "@/components/ui/button"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useWeb3Auth } from "@/components/hooks"

export default function Landing() {
	const router = useRouter()
	const [selected, setSelected] = useState(0)
	const [isKeyDown, setIsKeyDown] = useState(false)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isKeyDown) {
				setIsKeyDown(true)
				switch (e.key) {
					case "ArrowDown":
						setSelected((prev) => (prev === 1 ? 0 : 1))
						break
					case "ArrowUp":
						setSelected((prev) => (prev === 0 ? 1 : 0))
						break
					case "Enter":
						if (selected === 0) {
							router.push("/login")
						} else {
							router.push("/login")
						}
						break
					default:
						break
				}
			}
		}

		const handleKeyUp = () => {
			setIsKeyDown(false)
		}

		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("keyup", handleKeyUp)

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("keyup", handleKeyUp)
		}
	}, [isKeyDown, setSelected])

	return (
		<>
			<div className="w-full h-screen bg-jade-8 flex justify-center items-center p-8 top-0 absolute">
				<div className="w-full h-full flex justify-center items-center p-8 bg-jade-9">
					<div className="w-full h-full bg-jade-10 flex flex-col justify-around">
						<div className="flex justify-around">
							<Image src={logo} alt="logo" width={400} height={300} />
							<div className="text-white text-9xl">
								<h1>LET'S PLAY</h1>
								<h1 className="text-jade-9">LET'S PLAY</h1>
								<h1 className="text-jade-8">LET'S PLAY</h1>
							</div>
						</div>
						<div className="flex flex-col justify-center items-center">
							<Button
								onClick={() => {
									router.push("/login")
								}}
								variant="link"
								className={
									"w-72 text-3xl text-white " +
									(selected === 0 ? "bg-white/50" : "")
								}
							>
								CREATE AN ACCOUNT
							</Button>
							<Button
								onClick={() => {
									router.push("/login")
								}}
								variant="link"
								className={
									"w-72 text-3xl text-white " +
									(selected === 1 ? "bg-white/50" : "")
								}
							>
								I HAVE AN ACCOUNT
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
