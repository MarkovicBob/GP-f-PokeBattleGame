import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=800"
        );
        // console.log(res);
        setPokemons(res.data.results);
      } catch (error) {
        console.error("error fetching pokemons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  // console.log(pokemons);
  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        pokemons.map((pokemon, index) => {
          const pokemonId = index + 1;
          return (
            <Link
              key={pokemonId}
              to={`/pokemon/${pokemonId}`}
              className="bg-amber-600 p-4 shadow-xl rounded-xl text-center hover:scale-105 transition"
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonId}.gif
`}
                className="w-24 h-24 mx-auto"
                alt="pokemon image"
              />
              <p className="text-lg font-bold">{pokemon.name}</p>
            </Link>
          );
        })
      )}
    </div>
  );
}

export default Home;
