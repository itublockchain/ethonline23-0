"use client"
import Game from "./game"
import Image from "next/image"
import { VT323 } from "next/font/google"

const VT323Font = VT323({
	weight: "400",
	style: "normal",
	subsets: ["latin-ext"],
})

export default function FlappyBird() {
	return (
		<div className="px-8 w-full h-fit flex flex-col justify-center items-center bg-jade-8 min-h-screen">
			<div className="">
				<h1 className="text-white text-8xl">FLAPPY APE</h1>
			</div>
			<Game />
		</div>
	)
}
