import Leaderboard from "../pages/Leaderboard";
import pokelogo from "../assets/poke-logo.png";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar({ user }) {
  const [isNotice, setisNotice] = useState(false);
  const [isLeaderBoard, setIsLeaderBoard] = useState(false);

  return (
    <>
      <div
        className={`${
          isNotice
            ? "block w-[150px] z-[52] absolute top-[27px] text-black bg-[#f8f8ba] left-[1000px] h-[30px] text-center pt-[2px] border-2 rounded-[5px]"
            : "hidden"
        }`}
      >
        {" "}
        Back to home
      </div>
      <nav
        className={`${
          !user
            ? "pt-[38px] h-[80px] bg-white"
            : "sticky top-0 z-50 bg-white shadow-md p-5"
        } `}
      >
        <ul className="text-2xl text-[#FFFF00] flex items-center justify-between px-6">
          {user && (
            <>
              <li
                className="text-2xl font-bold text-[#ffff00]"
                style={{
                  textShadow:
                    "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                }}
              >
                Hello, {user}
              </li>

              <li className="flex gap-6">
                <NavLink
                  className="text-2xl font-bold text-[#ffff00]"
                  style={{
                    textShadow:
                      "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                  }}
                  onClick={() => {
                    setIsLeaderBoard(true);
                  }}
                >
                  Leaderboard
                </NavLink>
              </li>
            </>
          )}

          <li
            className="absolute left-1/2 transform -translate-x-1/2"
            onMouseEnter={() => {
              setisNotice(true);
            }}
            onMouseLeave={() => {
              setisNotice(false);
            }}
          >
            <NavLink to=" ">
              <div
                style={{ pokelogo: `url(${pokelogo})` }}
                className="logo w-40"
              ></div>
            </NavLink>
          </li>
        </ul>
      </nav>
      {isLeaderBoard && <Leaderboard setIsLeaderBoard={setIsLeaderBoard} />}
    </>
  );
}

export default Navbar;
