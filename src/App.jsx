import Game from "./pages/Game";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard.jsx";
import MainLayout from "./Layout/MainLayout";
import NotFound from "./pages/NotFound";
import Roster from "./pages/Roster";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const userName = localStorage.getItem("User");

    setUser(userName);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout user={user} />}>
          <Route index element={<Home setUser={setUser} />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/game" element={<Game />} />

          {/* NOT FOUND  */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
