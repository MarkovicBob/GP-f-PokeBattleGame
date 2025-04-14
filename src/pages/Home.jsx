import React from "react";
import backgroundImage from "../assets/background.jpg";
import pokeBall from "../assets/pokeball4.gif";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToRoster = () => {
    navigate("/roster");
  };
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="flex flex-col items-center justify-center h-full w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* <h1
          className="text-2xl font-bold text-[#ffff00]"
          style={{
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
          Pokemon Battle Game
        </h1> */}
        <p
          className="text-2xl text-center font-bold text-[#ffff00]"
          style={{
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
          🎮 Pick your team of 3 Pokémons from the roster <br />
          and head into battle – 3 vs 3!
        </p>
        <img
          onClick={goToRoster}
          src={pokeBall}
          alt="Pikachu"
          className="w-64 h-auto rounded-xl shadow-lg cursor-pointer"
        />
        {/* <div className="mt-6 space-x-4">
          <button
            onClick={goToRoster}
            className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            3vs3 Battle
          </button>
        </div> */}
      </div>
      {/* Footer */}
      <footer className="p-1 text-center bg-gray-800 text-gray-400">
        &copy; 2025 Pokemon Battle Game. All rights reserved. <br /> Patrick ||
        Ramil || Boban
      </footer>
    </div>
  );
}

export default Home;
