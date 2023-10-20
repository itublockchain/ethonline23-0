"use client";
import Image from "next/image";
import logo from "../../public/logo.png";
import { VT323 } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const VT323Font = VT323({weight: "400", style: "normal", subsets: ["latin-ext"]})

export default function Landing() {
    const router = useRouter()
    const [selected, setSelected] = useState(0)
    const [isKeyDown, setIsKeyDown] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (!isKeyDown) {
            setIsKeyDown(true);
            switch (e.key) {
              case "ArrowDown":
                setSelected((prev) =>
                    prev === 1 ? 0 : 1
                );
                break;
              case "ArrowUp":
                setSelected((prev) =>
                  prev === 0 ? 1 : 0
                );
                break;
              case "Enter":
                if (selected === 0) {
                    router.push("/landing")
                } else {
                    router.push("/landing")
                }
                break;
              default:
                break;
            }
          }
        };
    
        const handleKeyUp = () => {
          setIsKeyDown(false);
        };
    
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
    
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
          window.removeEventListener("keyup", handleKeyUp);
        };
      }, [isKeyDown, setSelected]);

    return <>
    <div className={`w-full h-screen bg-[#088E65] flex justify-center items-center p-8 ${VT323Font.className}`}>
        <div className="w-full h-full flex justify-center items-center p-8 bg-[#20A17A]">
            <div className="w-full h-full bg-[#27BC90] flex flex-col justify-around">
                <div className="flex justify-around">
                    <Image src={logo} alt="logo" width={400} height={300} />
                    <div className="text-white text-9xl">
                        <h1>LET'S PLAY</h1>
                        <h1>LET'S PLAY</h1>
                        <h1>LET'S PLAY</h1>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <button onClick={() => router.push("/landing")} className={"w-72 text-3xl text-white " + (selected === 0 ? "bg-lime-500" : "")}>CREATE AN ACCOUNT</button>
                    <button onClick={() => router.push("/landing")} className={"w-72 text-3xl text-white " + (selected === 1 ? "bg-lime-500" : "")}>I HAVE AN ACCOUNT</button>
                </div>
            </div>
        </div>
    </div>
    </>
}