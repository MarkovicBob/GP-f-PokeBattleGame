import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(res.data);
        // console.log(res);
      } catch (error) {
        console.error("error fetching single pokemon", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonDetails();
  }, [id]);
  return (
    <div className="p-6 text-center flex flex-col">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2 className="text-3-xl uppercase font-bold">{pokemon.name}</h2>
          <div>
            <img
              src={pokemon.sprites?.other?.showdown?.front_default}
              alt="pokemonImage"
              className="w-40 mx-auto"
            />
            <p className="text-lg">Weight:{pokemon.weight / 10} kg</p>
            <p className="text-lg">Height:{pokemon.height / 10} m</p>

            <ul>
              <p>MOVES: </p>
              {pokemon?.moves?.slice(0, 6).map((m, index) => (
                <li key={index}>{m.move.name}</li>
              ))}
            </ul>
            {/* <p>HP: {pokemon.stats[0].base_stat}</p>
            <p>ATTACK: {pokemon.stats[1].base_stat}</p>
            <p>DEFENCE: {pokemon.stats[2].base_stat}</p>
            <p>SPECIAL ATTACK: {pokemon.stats[3].base_stat}</p>
            <p>SPECIAL DEFENCE: {pokemon.stats[4].base_stat}</p>
            <p>SPEED: {pokemon.stats[5].base_stat}</p> */}

            <button
              className="text-blue-500 bg-amber-900 rounded-2xl w-25 cursor-pointer hover:bg-fuchsia-400 "
              onClick={() => navigate("/")}
            >
              BACK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonDetail;
