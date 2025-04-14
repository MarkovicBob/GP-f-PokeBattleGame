import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md p-5">
      <ul className="text-2xl text-[#FFFF00] flex items-center justify-between px-6">
        {/* Leva strana */}
        <li
          className="text-2xl font-bold text-[#ffff00]"
          style={{
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
          Hello, user
        </li>

        {/* Logo u sredini */}
        <li className="absolute left-1/2 transform -translate-x-1/2">
          <NavLink to=" ">
            <img
              className="w-40"
              src="/src/assets/poke-logo.png"
              alt="poke-logo"
            />
          </NavLink>
        </li>

        {/* Desna strana */}
        <li className="flex gap-6">
          <NavLink
            className="text-2xl font-bold text-[#ffff00]"
            style={{
              textShadow:
                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            }}
            to="leaderboard"
          >
            Leaderboard
          </NavLink>
          <NavLink
            className="text-2xl font-bold text-[#ffff00]"
            style={{
              textShadow:
                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            }}
            to="roster"
          >
            Roster
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
