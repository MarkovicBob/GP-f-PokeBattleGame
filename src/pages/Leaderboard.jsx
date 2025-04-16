import { useState, useEffect } from "react";
import axios from "axios";

function Leaderboard({ setIsLeaderBoard }) {
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
    <div className=" p-6 max-w-4xl mx-auto">
      <h1
        className="text-6xl font-bold text-center mb-8 text-[#ffff00]"
        style={{
          textShadow:
            "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
        }}
      >
        Leaderboard
      </h1>
      <div
        onClick={() => {
          setIsLeaderBoard(false);
        }}
        className="hover:cursor-pointer absolute right-[40px] top-[100px] bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 text-center w-24 mx-auto"
      >
        Х
      </div>
      <div className="flex mx-auto justify-center p-6">
        <ul>
          {sortedList.slice(0, 10).map((item, index) => {
            return (
              <li key={item.id} className="text-2xl">
                <span className="mr-4">{index + 1}</span>
                <span className="mr-4">{item.name}</span>
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
