"use client"
import { useState, useEffect } from "react";

type Game = {
  name: string;
  description?: string;
};

const games: Game[] = [
  { name: "deneme1", description: "deneme1 description" },
  { name: "deneme1", description: "deneme1 description" },
  { name: "deneme1", description: "deneme1 description" },
  { name: "deneme1", description: "deneme1 description" },
  { name: "deneme1", description: "deneme1 description" },
  { name: "deneme1", description: "deneme1 description" },
  { name: "deneme1", description: "deneme1 description" },
  { name: "deneme1", description: "deneme1 description" },
  { name: "deneme1", description: "deneme1 description" },
  { name: "deneme1", description: "deneme1 description" },
  { name: "deneme1", description: "deneme1 description" },
  { name: "deneme1", description: "deneme1 description" },
  { name: "deneme1", description: "deneme1 description" },
];

export default function GamesSlider() {
  const [currentGame, setCurrentGame] = useState<number>(0);
  const [isKeyDown, setIsKeyDown] = useState(false);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isKeyDown) {
        setIsKeyDown(true);
        switch (e.key) {
          case "ArrowDown":
            setCurrentGame((prev) => prev === games.length - 1 ? 0 : prev + 1);
            break;
          case "ArrowUp":
            setCurrentGame((prev) => prev === 0 ? games.length - 1 :  prev - 1);
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
  }, [isKeyDown, setCurrentGame]);

  return (
    <>
      <div className="w-full h-5/6 flex justify-around items-center bg-[#20A17A]">
        <ul className="flex flex-col text-[32px]">
          {games.map((game, index) => (
            <li key={index} className={`${currentGame === index ? "text-[#27BC90]" : "text-white"}`}>
              Game {index + 1}: {game.name.toUpperCase()}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-10 items-center">
          <div className="w-96 h-32 bg-[#D9D9D9]"></div>
          <div className="w-96 h-80 bg-[#27BC90] text-white text-3xl text-center p-4 overflow-scroll">
          {games[currentGame].description?.toUpperCase()}
          </div>
          <button className="w-48 h-16 bg-[#088E65] text-3xl text-white">BUY</button>
        </div>
      </div>
    </>
  );
}