import React, { useState } from "react";
import backgroundImage from "../assets/background.jpg";
import pokeBall from "../assets/pokeball4.gif";
import { useNavigate } from "react-router-dom";

function Home({ setUser }) {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("User", input);
    setInput("");
    setUser(input);
    navigate("/roster");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value.length > 2 && value.length < 20) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100 top-0">
        <div
          className="flex flex-col items-center justify-center h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <p
            className="text-2xl text-center font-bold text-[#ffff00] bg-[#ffffffb3] rounded p-4 "
            style={{
              textShadow:
                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            }}
          >
            🎮 Pick your team of 3 Pokémons from the roster <br />
            and head into battle – 3 vs 3!
          </p>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              onKeyDown={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
              type="text"
              name="user"
              placeholder="Enter your name here"
              className="py-4 px-2 bg-white text-black mt-4 text-center rounded"
            />

            <button type="submit" className={`${isValid ? "block" : "hidden"}`}>
              <img
                src={pokeBall}
                alt="Pikachu"
                className="w-64 h-auto rounded-xl shadow-lg cursor-pointer"
              />
            </button>
          </form>
        </div>
        <footer className="p-1 text-center bg-gray-800 text-gray-400">
          &copy; 2025 Pokemon Battle Game. All rights reserved. <br /> Patrick
          || Ramil || Boban
        </footer>
      </div>
    </>
  );
}

export default Home;
