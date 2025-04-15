import { useState, useEffect, useCallback } from "react";
import axios from "axios";

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

      // Загружаем команду A из localStorage
      const storedTeamA = JSON.parse(
        localStorage.getItem("selectedPokemons") || "[]"
      );

      if (storedTeamA.length === 3) {
        const details = await Promise.all(
          storedTeamA.map(async (id) => {
            const res = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${id}`
            );
            return res.data;
          })
        );

        setTeams((prevTeams) => ({
          ...prevTeams,
          teamA: details,
        }));
      }

      // Генерация случайной команды B
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=150"
      );
      if (!response.ok) {
        throw new Error("Error fetching Pokémon");
      }

      const data = await response.json();
      const shuffled = [...data.results].sort(() => 0.5 - Math.random());
      const selectedPokemons = shuffled.slice(0, 3);

      const teamBDetails = await Promise.all(
        selectedPokemons.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url);
          return await detailResponse.json();
        })
      );

      setTeams((prevTeams) => ({
        ...prevTeams,
        teamB: teamBDetails,
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
