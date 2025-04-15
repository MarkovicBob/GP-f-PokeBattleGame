import PokemonDetail from "./Details.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosStarOutline } from "react-icons/io";
import { MdOutlineStar } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

function Roster({ user }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoritesDetails, setFavoritesDetails] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const [setPokemon] = useState([]);

  // const handleClick = (pokemonId) => {

  //   setFavorites((prevFavorites) => {
  //     let updatedFavorites;
  //     if (prevFavorites.includes(pokemonId)) {
  //       return prevFavorites.filter((id) => id !== pokemonId);
  //     } else if (prevFavorites.length < 3) {
  //       return [...prevFavorites, pokemonId];
  //     }
  //     return prevFavorites;
  //   });
  //   localStorage.setItem("selectedPokemons", JSON.stringify(updatedFavorites));
  //   return updatedFavorites
  // };

  const handleClick = (pokemonId) => {
    setFavorites((prevFavorites) => {
      let updatedFavorites;
      if (prevFavorites.includes(pokemonId)) {
        updatedFavorites = prevFavorites.filter((id) => id !== pokemonId);
      } else if (prevFavorites.length < 3) {
        updatedFavorites = [...prevFavorites, pokemonId];
      } else {
        updatedFavorites = prevFavorites;
      }

      localStorage.setItem(
        "selectedPokemons",
        JSON.stringify(updatedFavorites)
      );
      return updatedFavorites;
    });
  };

  const handleBattle = () => {
    if (favorites.length === 3) {
      navigate("/game");
    } else {
      alert("Please select exactly 3 Pokémon to proceed!");
    }
  };

  const openModal = (pokemonId) => {
    setSelectedPokemon(pokemonId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=800"
        );
        setPokemons(res.data.results);
      } catch (error) {
        console.error("error fetching pokemons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`
        );
        console.log("Fetched Pokemon details:", res.data);
        setPokemon(res.data);
      } catch (error) {
        console.error("Error fetching pokemon details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedPokemon) {
      fetchPokemonDetail();
    }
  }, [selectedPokemon]);

  useEffect(() => {
    const fetchFavoritesDetails = async () => {
      setLoading(true);
      try {
        const details = await Promise.all(
          favorites.map(async (id) => {
            const res = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${id}`
            );
            return res.data;
          })
        );
        setFavoritesDetails(details);
      } catch (error) {
        console.error("Error fetching favorite Pokémon details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchFavoritesDetails();
    } else {
      setFavoritesDetails([]);
    }
  }, [favorites]);

  // console.log(pokemons);
  // constole.log(pokemon);
  return (
    <>
      <div className="flex flex-row justify-evenly sticky top-[80px] z-40 w-full bg-white p-5">
        <div className="flex flex-row gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <span
              key={index}
              className="bg-[#ffff00] max-w-max h-max p-4 shadow-xl rounded-xl text-center hover:scale-105 transition text-black"
            >
              {favoritesDetails[index] ? (
                <div className="flex flex-row items-center">
                  <div className="flex flex-col">
                    <p
                      className="text-2xl font-bold text-[#ffffff] uppercase"
                      style={{
                        textShadow:
                          "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                      }}
                    >
                      {favoritesDetails[index].name}
                    </p>
                    <p className="text-black text-left font-bold">
                      TYPE:{" "}
                      {favoritesDetails[index].types
                        .map((t) => t.type.name)
                        .join(", ")}
                    </p>
                    <p className="text-black text-left font-medium italic">
                      HP: {favoritesDetails[index].stats[0].base_stat}
                    </p>
                    <p className="text-black text-left font-medium italic">
                      ATTACK: {favoritesDetails[index].stats[1].base_stat}
                    </p>
                    <p className="text-black text-left font-medium italic">
                      DEFENSE: {favoritesDetails[index].stats[2].base_stat}
                    </p>
                    <p className="text-black text-left font-medium italic">
                      SPEED: {favoritesDetails[index].stats[5].base_stat}
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        favoritesDetails[index].sprites.other[
                          "official-artwork"
                        ].front_default
                      }
                      className="w-24 h-24 mx-auto p-2"
                      alt="pokemon image"
                    />
                    <button
                      className="bg-red-500 rounded-2xl p-2 cursor-pointer"
                      onClick={() => {
                        setFavorites((prevFavorites) =>
                          prevFavorites.filter((id) => id !== favorites[index])
                        );
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                "Choose Pokemon from below"
              )}
            </span>
          ))}
        </div>

        <div className="flex justify-center flex-col gap-2">
          <p className="text-center text-black italic font-semibold">
            {favorites.length === 0
              ? "Please select 3 Pokémons from roster below"
              : favorites.length === 1
              ? "Please select 2 Pokémons from roster below"
              : favorites.length === 2
              ? "Please select 1 Pokémon from roster below"
              : "Ready for battle!"}
          </p>
          <button
            onClick={handleBattle}
            className={`px-6 py-3 text-lg font-semibold text-white ${
              favorites.length === 3
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-400"
            } rounded-lg focus:outline-none focus:ring-4 cursor-pointer`}
          >
            Take it to the
            <br />
            battleground
          </button>
        </div>
      </div>
      <div className="p-6 grid grid-cols-4 md:grid-cols-6 gap-4">
        {loading ? (
          <p>
            <ScaleLoader color="#ffff00" />
          </p>
        ) : (
          pokemons.map((pokemon, index) => {
            const pokemonId = index + 1;
            return (
              <div
                key={pokemonId}
                className="bg-amber-400 p-4 shadow-xl rounded-xl text-center hover:scale-105 transition"
                onClick={() => openModal(pokemonId)}
              >
                <p className="text-xl font-bold uppercase">{pokemon.name}</p>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonId}.gif`}
                  className="w-24 h-24 mx-auto"
                  alt="pokemon image"
                />
                <button
                  className="text-5xl cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(pokemonId);
                  }}
                >
                  {favorites.includes(pokemonId) ? (
                    <MdOutlineStar />
                  ) : (
                    <IoIosStarOutline />
                  )}
                </button>
              </div>
            );
          })
        )}
      </div>

      {isModalOpen && selectedPokemon && (
        <div
          className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-yellow-500 border-2 border-black p-6 rounded-4xl shadow-lg w-150"
            onClick={(e) => e.stopPropagation()}
          >
            <PokemonDetail id={selectedPokemon} onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}

export default Roster;
