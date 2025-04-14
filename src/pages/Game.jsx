import React, { useState } from "react";
import usePokemonTeams from "../hooks/usePokemonTeams.jsx";
import { toast, Toaster } from "react-hot-toast";

function Game() {
  const { teams, loading, error, fetchNewTeams } = usePokemonTeams();
  const [battleLog, setBattleLog] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isBattling, setIsBattling] = useState(false);
  const [activePokemonA, setActivePokemonA] = useState(null);
  const [activePokemonB, setActivePokemonB] = useState(null);
  const [battleRound, setBattleRound] = useState(0);
  const [battleAnimation, setBattleAnimation] = useState(false);
  const [battleWinner, setBattleWinner] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const username = localStorage.getItem("username") || "Unknown Player";

  const saveGameResult = async (name, teamAPoints, teamBPoints) => {
    try {
      let score = teamAPoints * 10;
      if (teamAPoints === 3) {
        score += 10;
      }
      console.log("Sending data:", { name, score });

      await fetch("https://gp-b-pokebattle.onrender.com/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, score }),
      });

      console.log("Game result saved successfully!");
    } catch (error) {
      console.error("Failed to save game result:", error);
    }
  };

  const startCountdown = () => {
    setIsCountdownActive(true);
    let timeLeft = 3;
    setCountdown(timeLeft);

    const interval = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(interval);
        setIsCountdownActive(false);
        startBattle();
      }
    }, 1000);
  };

  const startBattle = async () => {
    setIsBattling(true);
    setBattleLog([]);
    setGameOver(false);
    setBattleRound(0);
    setBattleWinner(null);

    let teamAPoints = 0;
    let teamBPoints = 0;
    const newBattleLog = [];

    for (let i = 0; i < 3; i++) {
      setBattleWinner(null);
      setActivePokemonA(null);
      setActivePokemonB(null);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setActivePokemonA(teams.teamA[i]);
      setActivePokemonB(teams.teamB[i]);
      setBattleRound(i + 1);

      setIsJumping(true); // начать прыжок

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsJumping(false); // закончить прыжок

      await new Promise((resolve) => setTimeout(resolve, 500));

      setBattleAnimation(true); // теперь начинается бой

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const pokemonA = teams.teamA[i];
      const pokemonB = teams.teamB[i];

      const basePowerA = Object.values(pokemonA.stats).reduce(
        (sum, stat) => sum + stat,
        0
      );
      const basePowerB = Object.values(pokemonB.stats).reduce(
        (sum, stat) => sum + stat,
        0
      );

      const randomFactorA = 0.8 + Math.random() * 0.4;
      const randomFactorB = 0.8 + Math.random() * 0.4;

      const finalPowerA = Math.floor(basePowerA * randomFactorA);
      const finalPowerB = Math.floor(basePowerB * randomFactorB);

      let roundWinner, roundLog;

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (finalPowerA > finalPowerB) {
        teamAPoints++;
        roundWinner = `Team ${username}`;
        roundLog = `Round ${i + 1}: Team ${username} wins! ${
          pokemonA.name
        } (power: ${finalPowerA}) defeated ${
          pokemonB.name
        } (power: ${finalPowerB})`;

        setBattleWinner("A");
      } else if (finalPowerB > finalPowerA) {
        teamBPoints++;
        roundWinner = "Team Opponent";
        roundLog = `Round ${i + 1}: Team Opponent wins! ${
          pokemonB.name
        } (power: ${finalPowerB}) defeated ${
          pokemonA.name
        } (power: ${finalPowerA})`;
        setBattleWinner("B");
      } else {
        if (pokemonA.stats.speed > pokemonB.stats.speed) {
          teamAPoints++;
          roundWinner = `Team ${username}`;
          roundLog = `Round ${i + 1}: The forces are equal! ${
            pokemonA.name
          } wins thanks to superior speed!`;
          setBattleWinner("A");
        } else if (pokemonB.stats.speed > pokemonA.stats.speed) {
          teamBPoints++;
          roundWinner = "Team Opponent";
          roundLog = `Round ${i + 1}: The forces are equal! ${
            pokemonB.name
          } wins thanks to superior speed!`;
          setBattleWinner("B");
        } else {
          if (Math.random() > 0.5) {
            teamAPoints++;
            roundWinner = `Team ${username}`;
            roundLog = `Round ${i + 1}: Absolute draw! ${
              pokemonA.name
            } wins by chance!`;
            setBattleWinner("A");
          } else {
            teamBPoints++;
            roundWinner = "Team Opponent";
            roundLog = `Round ${i + 1}: Absolute draw! ${
              pokemonB.name
            } wins by chance!`;
            setBattleWinner("B");
          }
        }
      }

      newBattleLog.push(roundLog);
      setBattleLog((prev) => [...prev, roundLog]);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setBattleAnimation(false);

      setTimeout(() => {
        setActivePokemonA(null);
        setActivePokemonB(null);
      }, 300);

      if (i < 2) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    let tournamentWinner;
    if (teamAPoints > teamBPoints) {
      tournamentWinner = `Team ${username}`;
      toast.success("You Won!", {
        icon: "👏",
      });
    } else if (teamBPoints > teamAPoints) {
      tournamentWinner = "Team Opponent";
      toast.error("You Lost!");
    } else {
      tournamentWinner = "Draw";
      toast("It's a Draw!");
    }

    setWinner(tournamentWinner);
    setGameOver(true);
    setIsBattling(false);
    setActivePokemonA(null);
    setActivePokemonB(null);
    setBattleRound(0);

    if (tournamentWinner === `Team ${username}`) {
      saveGameResult(username, teamAPoints, teamBPoints);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl font-bold text-blue-600 animate-pulse">
          Selecting Pokemon for the tournament...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="text-xl font-bold text-red-600">Ошибка: {error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f0fdfa] py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-[#0f766f] mb-8 shadow-sm">
        Pokemon Battle 3x3
      </h1>
      <Toaster position="top-center" reverseOrder={false} si />
      {/* Main Screen */}
      {!battleAnimation ? (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="team-container w-full md:w-5/12 bg-[#96f6e4] rounded-lg p-4 shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-bold text-[#0f766f] text-center border-b-2 border-[#0f766f]-300 pb-2 mb-4 w-full">
              Team {username}
            </h2>
            <div className="grid grid-cols-1 gap-6 w-full">
              {teams.teamA.map((pokemon, index) => (
                <div
                  key={`${pokemon.id}-${battleRound}`}
                  className="pokemon-card flex flex-col items-center justify-center p-4"
                >
                  <div
                    className={`relative w-32 h-32 ${
                      activePokemonA === pokemon ? "animate-bounce" : ""
                    }`}
                  >
                    <img
                      src={pokemon.officialArt}
                      alt={pokemon.name}
                      className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-[#0f766f] capitalize">
                    {pokemon.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          <div className="battle-area w-full md:w-2/12 flex flex-col items-center justify-center">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
              alt="VS"
              className="w-16 h-16 mb-4 animate-bounce"
            />
            {!isCountdownActive ? (
              <button
                onClick={startCountdown}
                disabled={isBattling}
                className={`w-full hover:cursor-pointer py-3 px-6 rounded-full font-bold text-white shadow-lg transform transition-all duration-300 
                  ${
                    isBattling
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 hover:scale-105"
                  }`}
              >
                {isBattling ? "The battle is on..." : "Start tournament"}
              </button>
            ) : (
              <div className="text-2xl font-bold text-orange-600">
                Starting in {countdown}...
              </div>
            )}
          </div>

          <div className="team-container w-full md:w-5/12 bg-[#ccfbf1] rounded-lg p-4 shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-bold text-[#0f766f] text-center border-b-2 border-[#0f766f]-300 pb-2 mb-4 w-full">
              Team Opponent
            </h2>
            <div className="grid grid-cols-1 gap-6 w-full">
              {teams.teamB.map((pokemon, index) => (
                <div
                  key={pokemon.id}
                  className="pokemon-card flex flex-col items-center justify-center p-4"
                >
                  <div
                    className={`relative w-32 h-32 ${
                      activePokemonB === pokemon ? "animate-bounce" : ""
                    }`}
                  >
                    <img
                      src={pokemon.officialArt}
                      alt={pokemon.name}
                      className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-[#0f766f] capitalize">
                    {pokemon.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="battle-screen bg-gradient-to-b from-yellow-50 to-orange-100 rounded-lg p-6 shadow-xl mb-8 min-h-96">
          <h2 className="text-2xl font-bold text-center text-orange-800 mb-6">
            Round {battleRound}
          </h2>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div
              className={`pokemon-fighter w-full md:w-5/12 flex flex-col items-center ${
                battleWinner === "A"
                  ? "scale-110"
                  : battleWinner === "B"
                  ? "opacity-60"
                  : ""
              } transition-all duration-500`}
            >
              {activePokemonA && (
                <>
                  <div className="w-40 h-40 md:w-52 md:h-52 relative">
                    <img
                      src={activePokemonA.officialArt}
                      alt={activePokemonA.name}
                      className={`w-full h-full object-contain ${
                        battleAnimation ? "animate-pulse" : ""
                      }`}
                    />
                    {battleWinner === "A" && (
                      <div className="absolute -top-4 -right-4 text-3xl">
                        🏆
                      </div>
                    )}
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-red-700 capitalize">
                    {activePokemonA.name}
                  </h3>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-red-600 h-4 rounded-full"
                      style={{
                        width: `${(activePokemonA.stats.hp / 255) * 100}%`,
                      }}
                    ></div>
                  </div>
                </>
              )}
            </div>

            <div className="battle-vs w-full md:w-2/12 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-orange-600 animate-pulse">
                VS
              </div>
            </div>

            <div
              className={`pokemon-fighter w-full md:w-5/12 flex flex-col items-center ${
                battleWinner === "B"
                  ? "scale-110"
                  : battleWinner === "A"
                  ? "opacity-60"
                  : ""
              } transition-all duration-500`}
            >
              {activePokemonB && (
                <>
                  <div className="w-40 h-40 md:w-52 md:h-52 relative">
                    <img
                      src={activePokemonB.officialArt}
                      alt={activePokemonB.name}
                      className={`w-full h-full object-contain ${
                        battleAnimation ? "animate-pulse" : ""
                      }`}
                    />
                    {battleWinner === "B" && (
                      <div className="absolute -top-4 -right-4 text-3xl">
                        🏆
                      </div>
                    )}
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-[#0f766f] capitalize">
                    {activePokemonB.name}
                  </h3>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-600 h-4 rounded-full"
                      style={{
                        width: `${(activePokemonB.stats.hp / 255) * 100}%`,
                      }}
                    ></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Result */}
      {gameOver && !battleAnimation && (
        <div className="battle-results bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-[#0f766f] mb-4 border-b-2 border-[#0f766f] pb-2">
            Result
          </h2>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            {battleLog.map((log, index) => (
              <p
                key={index}
                className={`py-2 px-3 mb-2 rounded-lg ${
                  log.includes("wins")
                    ? log.includes(`Team ${username} wins`)
                      ? "bg-[#96f6e4] text-[#0f766f]"
                      : "bg-[#ccfbf1] text-[#0f766f]"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {log}
              </p>
            ))}
          </div>

          <h3
            className={`text-xl font-bold text-center p-3 rounded-lg ${
              winner === `Team ${username}`
                ? "bg-red-100 text-red-700"
                : winner === "Team Opponent"
                ? "bg-blue-100 text-[#0f766f]"
                : "bg-purple-100 text-purple-700"
            }`}
          >
            Winner: {winner}
          </h3>
        </div>
      )}
    </div>
  );
}

export default Game;
