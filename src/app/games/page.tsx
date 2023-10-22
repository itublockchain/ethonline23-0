import { GamesSlider } from "@/components"
import logo from "../../../public/logo.png"
import Image from "next/image"
import { VT323 } from "next/font/google"

const VT323Font = VT323({
	weight: "400",
	style: "normal",
	subsets: ["latin-ext"],
})

export default function Games() {
	return (
		<>
			<div className="px-8 w-full h-full flex flex-col justify-center items-center bg-[#088E65]">
				<div className="">
					<h1 className="text-white text-8xl">GAMES</h1>
				</div>
				<GamesSlider />
			</div>
		</>
	)
}
