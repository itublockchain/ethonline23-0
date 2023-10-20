import { GamesSlider } from "@/components";
import { VT323 } from "next/font/google";
import logo from "../../../public/logo.png";
import Image from "next/image";

const VT323Font = VT323({
  weight: "400",
  style: "normal",
  subsets: ["latin-ext"],
});

export default function Games() {
  return (
    <>
      <div
        className={`${VT323Font.className} px-8 w-full h-screen flex flex-col justify-center items-center bg-[#088E65]`}
      >
        <div className="">
          <Image src={logo} alt="logo" width={120} className="absolute top-5 left-8" />
          <h1 className="text-white text-8xl">GAMES</h1>
        </div>
        <GamesSlider />
      </div>
    </>
  );
}
