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
    // const user1 = localStorage.getItem("User");
    // setUser(user1);
    const user = JSON.parse(localStorage.getItem("User"));
    console.log(user);
    setUser(user);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout user={user} />}>
          <Route index element={<Home />} />
          <Route path="/roster" element={<Roster user={user} />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />

          {/* NOT FOUND  */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
