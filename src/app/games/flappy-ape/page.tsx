"use client"
import Game from "./game"
import { VT323 } from "next/font/google"
import LeaderBoard from "@/components/LeaderBoard"

export default function FlappyBird() {
	return (
		<div className="px-8 w-full h-fit flex flex-col justify-center items-center bg-jade-8 min-h-screen relative p-20">
			<div className="absolute top-10 right-20">
				<LeaderBoard />
			</div>
			<div className="">
				<h1 className="text-white text-8xl">FLAPPY APE</h1>
			</div>
			<Game />
		</div>
	)
}
