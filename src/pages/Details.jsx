import axios from "axios";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

function PokemonDetail({ id, onClose }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(res.data);
      } catch (error) {
        console.error("Error fetching single Pokémon", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchPokemonDetails();
    }
  }, [id]);

  if (loading || !pokemon) {
    return (
      <p className="p-6 text-center">
        <ScaleLoader />
      </p>
    );
  }

  return (
    <div className="p-6 text-center flex flex-col">
      <h2 className="text-6xl uppercase pb-10 font-extrabold ">
        {pokemon.name}
      </h2>
      <div className="flex flex-row gap-10 justify-evenly">
        <div>
          <img
            src={pokemon.sprites?.other?.showdown?.front_default}
            alt="pokemonImage"
            className="w-50 mx-auto"
          />
          <p className="text-2xl font-bold italic uppercase">
            Type: {pokemon.types.map((t) => t.type.name).join(", ")}
          </p>
          <p className="text-lg">Weight: {pokemon.weight / 10} kg</p>
          <p className="text-lg">Height: {pokemon.height / 10} m</p>
        </div>
        <div>
          <p className="font-bold italic">MOVES:</p>
          <ul className="list-disc text-left pl-6">
            {pokemon.moves.slice(0, 12).map((m, index) => (
              <li key={index}>{m.move.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <button
        className="mt-6 text-black bg-yellow-100 rounded-2xl px-4 py-2 cursor-pointer hover:bg-yellow-200"
        onClick={onClose}
      >
        CLOSE
      </button>
    </div>
  );
}

export default PokemonDetail;
