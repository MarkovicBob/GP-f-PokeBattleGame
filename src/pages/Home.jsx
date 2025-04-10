import React from "react";

function Home() {
  const startBattle = (type) => {
    alert(`Starting a ${type} battle!`);
    // Ovde možeš dodati logiku za preusmeravanje na battle stranicu
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="flex flex-col items-center justify-center h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('https://example.com/pokemon-hero.jpg')",
        }}
      >
        <h1 className="text-5xl font-bold text-white drop-shadow-md">
          Pokemon Battle Game
        </h1>
        <p className="mt-4 text-xl text-white drop-shadow-sm">
          Choose your challenge! Battle 1vs1 or team up for 3vs3.
        </p>
        <div className="mt-6 space-x-4">
          <button
            onClick={() => startBattle("1vs1")}
            className="px-6 py-3 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            1vs1 Battle
          </button>
          <button
            onClick={() => startBattle("3vs3")}
            className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            3vs3 Battle
          </button>
        </div>
      </div>
      {/* Footer */}
      <footer className="py-4 text-center bg-gray-800 text-gray-400">
        &copy; 2025 Pokemon Battle Game. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
