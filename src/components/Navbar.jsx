import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul className="bg-teal-200 text-2xl text-blue-950 flex flex-row justify-evenly p-3">
        <li>
          <NavLink to=" ">Home</NavLink>{" "}
        </li>
        <li>
          {" "}
          <NavLink to=""> Settings</NavLink>{" "}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
