import { useState, useEffect, useCallback } from "react";

const usePokemonTeams = () => {
  const [teams, setTeams] = useState({
    teamA: [],
    teamB: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewTeams = useCallback(async () => {
    try {
      setLoading(true);

      const storedTeamA = localStorage.getItem("selectedPokemons") || "[]";
      console.log(storedTeamA);
      if (storedTeamA.length === 3) {
        setTeams((prevTeams) => ({
          ...prevTeams,
          teamA: storedTeamA,
        }));
      }

      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=150"
      );

      if (!response.ok) {
        throw new Error("Error by Fetching");
      }

      const data = await response.json();

      const shuffled = [...data.results].sort(() => 0.5 - Math.random());
      const selectedPokemons = shuffled.slice(0, 6);

      const pokemonDetails = await Promise.all(
        selectedPokemons.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url);
          const details = await detailResponse.json();

          return {
            id: details.id,
            name: details.name,
            frontImage: details.sprites.front_default,
            backImage: details.sprites.back_default,
            officialArt:
              details.sprites.other?.["official-artwork"]?.front_default ||
              details.sprites.front_default,
            stats: {
              hp: details.stats.find((stat) => stat.stat.name === "hp")
                .base_stat,
              attack: details.stats.find((stat) => stat.stat.name === "attack")
                .base_stat,
              defense: details.stats.find(
                (stat) => stat.stat.name === "defense"
              ).base_stat,
              specialAttack: details.stats.find(
                (stat) => stat.stat.name === "special-attack"
              ).base_stat,
              specialDefense: details.stats.find(
                (stat) => stat.stat.name === "special-defense"
              ).base_stat,
              speed: details.stats.find((stat) => stat.stat.name === "speed")
                .base_stat,
            },
            types: details.types.map((type) => type.type.name),
          };
        })
      );

      setTeams((prevTeams) => ({
        teamA: prevTeams.teamA.length
          ? prevTeams.teamA
          : pokemonDetails.slice(0, 3),
        teamB: pokemonDetails.slice(3, 6),
      }));

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNewTeams();
  }, [fetchNewTeams]);

  return { teams, loading, error, fetchNewTeams };
};

export default usePokemonTeams;
