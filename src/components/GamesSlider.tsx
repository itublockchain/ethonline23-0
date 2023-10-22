"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ReactPlayer from "react-player"
import { Button } from "./ui/button"
import Link from "next/link"

type Game = {
	name: string
	description?: string
	link: string
	video: string
}

const games: Game[] = [
	{
		name: "Monkey Surf",
		description:
			'In the game, players take the role of young graffiti artists who, upon being caught in the act of "tagging" a metro railway site, run through the railroad tracks to escape from the inspector and his dog. As they run, they grab gold coins, power-ups, and many other items along the way while simultaneously dodging collisions with trains and other objects. They can also jump on top of the trains and surf with hoverboards to evade capture until the character crashes into an obstacle, gets caught by the inspector, or gets hit by a train, at which point the game ends.',
		link: "#",
		video: "https://www.youtube.com/watch?v=rRzdU1bt0a8&ab_channel=KimJenny100",
	},
	{
		name: "Flappy APE",
		description:
			"Flappy APE is an arcade-style game in which the player controls the monkey Ape, which moves persistently to the right. The player is tasked with navigating Ape through pairs of pipes that have equally sized gaps placed at random heights.",
		link: "/flappy-ape",
		video:
			"https://www.youtube.com/watch?v=1oDTiKr5QdA&ab_channel=FNAFGamerhttps://www.youtube.com/watch?v=1oDTiKr5QdA&ab_channel=FNAFGamer",
	},
	{
		name: "GTA San Andreas",
		description:
			"Grand Theft Auto: San Andreas is an action-adventure game with role-playing and stealth elements. Structured similarly to the previous two games in the series, the core gameplay consists of elements of third-person shooter and driving games, affording the player a large, open world environment in which to move around.",
		link: "#",
		video: "https://www.youtube.com/watch?v=yOzcbtsw_pQ&ab_channel=IGN",
	},
	{
		name: "Flappy Bird",
		description:
			"Flappy Bird is an arcade-style game in which the player controls the bird Faby, which moves persistently to the right. The player is tasked with navigating Faby through pairs of pipes that have equally sized gaps placed at random heights.",
		link: "#",
		video:
			"https://www.youtube.com/watch?v=1oDTiKr5QdA&ab_channel=FNAFGamerhttps://www.youtube.com/watch?v=1oDTiKr5QdA&ab_channel=FNAFGamer",
	},
	{
		name: "Example Game",
		description: "Example Game description",
		link: "#",
		video: "https://www.youtube.com/516cba45-4045-443e-a932-1ac516e7aedb",
	},
]

export default function GamesSlider() {
	const [currentGame, setCurrentGame] = useState<number>(0)
	const [isKeyDown, setIsKeyDown] = useState(false)
	const router = useRouter()

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isKeyDown) {
				setIsKeyDown(true)
				switch (e.key) {
					case "ArrowDown":
						setCurrentGame((prev) => (prev === games.length - 1 ? 0 : prev + 1))
						break
					case "ArrowUp":
						setCurrentGame((prev) => (prev === 0 ? games.length - 1 : prev - 1))
						break
					case "Enter":
						router.push("games" + games[currentGame].link)
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
	}, [isKeyDown, setCurrentGame])

	return (
		<>
			<div className="w-full h-fit flex justify-around items-center bg-jade-7">
				<ul className="flex flex-col text-[32px]">
					{games.map((game, index) => (
						<li
							onClick={() => {
								setCurrentGame(index)
							}}
							key={index}
							className={`${
								currentGame === index ? "text-green-8" : "text-white"
							} hover:cursor-pointer`}
						>
							Game {index + 1}: {game.name.toUpperCase()}
						</li>
					))}
				</ul>
				<div className="flex flex-col gap-10 items-center p-4">
					<ReactPlayer
						url={games[currentGame].video}
						controls={false}
						loop={true}
						width={400}
					/>
					<div className="w-96 h-80 bg-[#27BC90] text-white text-md text-center p-4 overflow-hidden">
						{games[currentGame].description?.toUpperCase()}
					</div>
					<Link href={"/market"} target="blank">
						<Button>Get Access</Button>
					</Link>
				</div>
			</div>
		</>
	)
}
