import { useState, useEffect } from "react";
import axios from "axios";

function Leaderboard() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const leaderBoard = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://gp-b-pokebattle.onrender.com/leaderboard`
        );

        const leaderBoardList = res.data.data;
        console.log(leaderBoardList);
        setList(leaderBoardList);
      } catch (error) {
        console.error("Error fetching Leaderboard", error);
      } finally {
        setLoading(false);
      }
    };
    leaderBoard();
  }, []);

  const sortedList = [...list].sort((a, b) => b.score - a.score);

  return (
    <div>
      <h1
        className="text-6xl font-bold text-center mb-8 shadow-sm   text-[#ffff00]"
        style={{
          textShadow:
            "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
        }}
      >
        Leaderboard
      </h1>
      <div className="d-flex mx-auto justify-center">
        <ul>
          {sortedList.map((item) => {
            return (
              <li key={item.id}>
                <span>{item.id}</span>
                <span>{item.name}</span>
                <span>{item.score}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
